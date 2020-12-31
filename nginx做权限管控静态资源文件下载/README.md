原文地址 转载自 https://www.cnblogs.com/kgdxpr/p/3587878.html


```
nginx.conf

location / {
            proxy_redirect off;
            proxy_set_header Host  $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://backend;            
        }

location /file/ {
            internal;
            alias /usr/local/;
        }
设置成 "internal" 属性是用来禁止浏览器直接访问的,只信任后台返回的 "X-Accel-Redirect"。

getDownFile.jsp

<%
    String filename = request.getParameter("filename");
    response.setHeader("Content-Disposition", "attachment;filename="+filename);
    response.setHeader("Content-Type", "application/octet-stream");
    response.setHeader("X-Accel-Redirect", "/file/"+filename);
%>

 http://10.10.3.205/test/getDownFile.jsp?filename=5.zip

请求到nginx后会发给Tomcat，先判断是否可以下载，若可以下载设置X-Accel-Redirect回给nginx，nginx重新定位到物理文件进行下载。

 

下面是JFinal的用法

html

<a href="<%=path%>/redis_test/testResponse?id=1&filename=5.zip">下载</a>
后台

String filename = getPara("filename");
        String id = getPara("id");
        if(id.equals("1"))
        {
            getResponse().setHeader("Content-Type", "application/octet-stream");
            getResponse().setHeader("Content-Disposition", "attachment;filename="+ URLEncoder.encode("中文名.zip", "UTF-8"));
            getResponse().setHeader("X-Accel-Redirect", "/file/"+filename);
            
        } 
        renderNull();
