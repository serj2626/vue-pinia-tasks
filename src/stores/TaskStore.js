import { defineStore } from "pinia"
import { ref, computed } from "vue"


export const useTaskStore = defineStore('taskStore', () => {
    const tasks = ref([]);
    const loading = ref(false);
    const name = ref('Pinia Tasks');
    const favs = computed(() => tasks.value.filter(t => t.isFav));
    const favCount = computed(() => favs.value.length);
    const totalCount = computed(() => tasks.value.length);

    function $reset() {
        tasks.value = []
    }


    async function getTasks() {
        loading.value = true
        const res = await fetch('http://localhost:3000/tasks')
        const data = await res.json()
        tasks.value = data
        loading.value = false
    };

    async function addTask(task) {
        tasks.value.push(task);

        const res = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.error) {
            console.log(res.error)
        };
    };

    async function deleteTask(id) {
        tasks.value = tasks.value.filter(t => t.id !== id);

        const res = await fetch('http://localhost:3000/tasks/' + id, {
            method: 'DELETE',
        })

        if (res.error) {
            console.log(res.error)
        }
    };

    async function toggleFav(id) {
        const task = tasks.value.find(t => t.id === id)
        task.isFav = !task.isFav

        const res = await fetch('http://localhost:3000/tasks/' + id, {
            method: 'PATCH',
            body: JSON.stringify({ isFav: task.isFav }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (res.error) {
            console.log(res.error)
        }
    };


    return {
        tasks, name, favs, favCount, totalCount, $reset,
        addTask, deleteTask, toggleFav, loading, getTasks
    }
})



