<script setup>
import { useTaskStore } from '@/stores/TaskStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import TaskDetail from '@/components/TaskDetail.vue';
import TaskForm from '@/components/TaskForm.vue';

const taskStore = useTaskStore();

const { tasks, loading, favs, totalCount, favCount } = storeToRefs(taskStore);

//fetch tasks
taskStore.getTasks();

const filter = ref('all');


</script>

<template>
    <main>
        <!--Heading-->
        <header>
            <img src="./assets/pinia-logo.svg" alt="pinia logo">
            <h1>{{ taskStore.name }}</h1>
        </header>

        <!-- new task form -->
        <div class="new-task-form">
            <task-form />
        </div>

        <!--Filter-->
        <nav class="filter">
            <button class="all-button" @click="filter = 'all'">Все задачи</button>
            <button class="fav-button" @click="filter = 'favs'">Избранные задачи</button>
        </nav>


        <!--loading-->
        <div class="loading" v-if="loading">
            Загружаю задачи...
        </div>

        <!-- task list -->
        <div class="task-list" v-if="filter === 'all'">
            <p>Все задачи ({{ totalCount }})</p>
            <div v-for="task in tasks" :key="task.id">
                <task-detail :task="task" />
            </div>
        </div>

        <div class="task-list" v-if="filter === 'favs'">
            <p>Количество избранных задач ({{ favCount }})</p>
            <div v-for="task in favs" :key="task.id">
                <task-detail :task="task" />
            </div>
        </div>

        <button class="reset"  @click="taskStore.$reset">Очистить</button>
    </main>
</template>


<style scoped>

.reset {
    font-size: 18px;
    margin-left: 300px;
    padding: 10px 15px;
    border: 1px solid black;
    border-radius: 26%;
    color: white;
    background-color: red;
}
.reset:hover {
    cursor: pointer;
    background-color: rgb(190, 10, 10);
}

.all-button {
    font-size: 18px;
    color: blue;
    margin: 0 10px;
    padding: 10px 15px;
    border: 1px solid black;
    border-radius: 26%;
    background-color: rgb(245, 213, 8);
}

.fav-button {
    font-size: 18px;
    margin: 0 10px;
    padding: 10px 15px;
    border: 1px solid black;
    border-radius: 26%;
    color: white;
    background-color: rgb(3, 221, 61);
}

</style>