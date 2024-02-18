<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/TaskStore'

const taskStore = useTaskStore()

const newTask = ref('')

const handleSubmit = () => {
    if (newTask.value.length > 0) {
        taskStore.addTask({
            id: taskStore.totalCount + 1,
            title: newTask.value,
            isFav: false
            
        })
        newTask.value = ""
    }
};

</script>


<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Добавьте новую задачу..." v-model="newTask">
        <button>Добавить</button>
    </form>
</template>