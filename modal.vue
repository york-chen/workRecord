<template>
    <div v-show="controller">
        <div ref="modalMask" class="modal-mask"></div>
        <div ref="modalWrap" @click="closeOrOpenModal" class="modal-wrap">
            <div class="modal-slot" @click.stop="stopMaopao" v-if="showCloseBtn">
                    <img class="modal-close" @click="closeOrOpenModal" src="https://dpic-1256841441.cos.ap-chengdu.myqcloud.com/tencentActivity/close.png" alt="">
                <slot></slot>
            </div>
            <div v-else @click.stop="stopMaopao">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        model: {
            prop: 'controller',
            event: "closeModal"
        },
        props:{
            controller:{
                type:Boolean,
                default:false
            },
            showCloseBtn:{
                type:Boolean,
                default:true
            }
        },
        methods: {
            closeOrOpenModal() {
                this.$emit('closeModal', false);
            },
            stopMaopao() {
                return false;
            },
            controllerPosition(position){
                this.$refs['modalMask'].style.top = position + 'px';
                this.$refs['modalWrap'].style.top = position + 'px';
            }
        },
        watch:{
            controller(val){
                if (val) {
                    document.body.classList.add('modal-open');
                } else {
                    document.body.classList.remove('modal-open');
                    this.showModalCloseBtn = true;
                }
            }
        }
    }
</script>
<style scoped>
    .modal-mask,
    .modal-wrap {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1073;
        height: 100%;
    }
    .modal-mask {
        background: rgba(0, 0, 0, .6);
    }
    .modal-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .modal-slot{
        position: relative;
    }
    .modal-close{
        position: absolute;
        width: .88rem;
        height: .88rem;
        right: -.44rem;
        top: -.44rem;
    }
</style>
<style>
    html,body{
        overflow: auto;
    }
    body.modal-open {
        overflow: hidden;
    }
</style>



