<template>
    <li>
		<label>
			<input type="checkbox" :checked="todo.done" @click="HandleCheck(todo.id)"/>
			<!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
			<!-- <input type="checkbox" v-model="todo.done"/> -->
			<span v-show="!todo.isEdit">{{todo.title}}</span>
			<input v-show="todo.isEdit" type="text" :value="todo.title" @blur="HandleBlur(todo,$event)" ref="inputTitle">
		</label>
		<button class="btn btn-danger" @click="HandleDeleteTodo(todo.id)">Delete</button>
		<button class="btn btn-edit" v-show="!todo.isEdit" @click="HandlerEdit(todo)">Edit</button>
	</li>
</template>

<script>
export default {
    name:'Item',
    props:['todo'],
    methods: {
        HandleCheck(id){
            //通知todo的done值取反
			this.$nuxt.$emit('checkTodo', id)
            //this.checkTodo(id)
        },
        HandleDeleteTodo(id){
            if(confirm('Confirm to delete？')){
                //删除
				this.$nuxt.$emit('deleteTodo',id)
                //this.deleteTodo(id)
            }
        },
		HandlerEdit(todo){
			
			if(todo.isEdit !== undefined){ //或者 todo.hasOwnProperty('isEdit')
				todo.isEdit = true
			}else{
				this.$set(todo,'isEdit',true)
			}
			this.$nextTick(function(){ this.$refs.inputTitle.focus()}) //dom更新完才获取对焦
		},
		//失去焦点的回调（真正执行修改逻辑）
		HandleBlur(todo,event){
			todo.isEdit = false
			if(!event.target.value.trim()) return  // 防止为空
			this.$nuxt.$emit('updateTodo',todo.id,event.target.value) //update title
		}
    },
}
</script>

<style scoped>
/*item*/
	li {
		list-style: none;
		height: 36px;
		line-height: 36px;
		padding: 0 5px;
		border-bottom: 1px solid #ddd;
	}

	li label {
		float: left;
		cursor: pointer;
	}

	li label li input {
		vertical-align: middle;
		margin-right: 6px;
		position: relative;
		top: -1px;
	}

	li button {
		float: right;
		display: none;
		margin-top: 3px;
	}

	li:before {
		content: initial;
	}

	li:last-child {
		border-bottom: none;
	}

	li:hover{
		background-color: #ddd;
	}
	
	li:hover button{
		display: block;
	}
</style>