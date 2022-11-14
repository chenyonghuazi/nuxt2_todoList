<template>
    <div class="todo-footer" v-show="todos.length">
		<label>
			<!-- <input type="checkbox" :checked="isAll" @change="checkAll"/> -->
			<input type="checkbox" v-model="isAll"/>
		</label>
		<span>
			<span>Finished{{doneTotal}}</span> /Total{{todos.length}}
		</span>
		<button class="btn btn-danger" @click="HandleClearAll">Delete all finished todo</button>
	</div>
</template>

<script>
export default {
    name:'MyFooter',
    props:['todos'],

    computed:{
        doneTotal(){
            //原始方法
            // let count = 0
            // this.todos.forEach(todo => {
            //     if(todo.done) count++
            // });

            //使用reduce方法     reduce是统计专用的方法
            return this.todos.reduce((pre,current)=>{   //pre是箭头函数的返回值
                return pre + (current.done ? 1 : 0)
            },0)
        },
        isAll:{
            get(){
                return this.doneTotal === this.todos.length && this.todos.length > 0
            },
            set(value){
				this.$emit('checkAllTodo', value)
                
            }
            
        },
    },
    methods: {
        HandleClearAll(){
            this.$emit("deleteAllTodo")
        }
    },
	mounted() {
		console.log(this._events)
	},
}
</script>

<style scoped>
	.todo-footer {
		height: 40px;
		line-height: 40px;
		padding-left: 6px;
		margin-top: 5px;
	}

	.todo-footer label {
		display: inline-block;
		margin-right: 20px;
		cursor: pointer;
	}

	.todo-footer label input {
		position: relative;
		top: -1px;
		vertical-align: middle;
		margin-right: 5px;
	}

	.todo-footer button {
		float: right;
		margin-top: 5px;
	}
</style>