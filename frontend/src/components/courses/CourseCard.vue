<template>
    <div class="course-card" @click="$emit('course-click', id)">
        <img :src="imageCourse" alt="Imagen del curso {{ title }}" class="course-image" />

        <div class="course-content">
            <div class="h-description">
                <div>
                    <span class="course-category"> {{ category }} </span>
                    <span class="course-category">{{ complexity }}</span>
                </div>

                <div class="course-time">
                    <i class="mdi mdi-clock-outline"></i>
                    <span> {{ duration }}</span>
                </div>
            </div>

            <h3 class="course-title"> {{ title }}</h3>
            <p class="course-description"> {{ description }} </p>

            <div class="h-description">
                <div class="professor-info">
                    <img :src="imageProfesor" alt="Imagen del profesor" class="course-professor-image" />
                    <span class="course-professor-name"> {{ professorName }} </span>
                </div>

                <div class="course-price">
                    <span> ${{ price }}</span>
                </div>
            </div>

            
        </div>

    </div>
</template>

<script setup>
    const props = defineProps({
        id: String,
        title: String,
        category: String,
        complexity: String,
        duration: String,
        imageCourse: String,
        description: String,
        imageProfesor: String,
        professorName: String,
        price: String
    });

    defineEmits(['course-click']);
</script>

<style scoped>
    .course-card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    width: 22vw;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    }

    .course-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
    }

    .course-image {
        width: 95%;
        height: 40%;
        object-fit: cover;
        border-radius: 25px;
        margin: 10px;
    }

    .course-content {
        padding: 16px;
        width: 100%;
    }

    .course-category {
        display: inline-block;
        padding: 4px 10px;
        background: #f5f5f5;
        border-radius: 6px;
        font-size: 13px;
        color: #696983;
        margin-bottom: 8px;
        margin-right: 8px;
    }

    .course-title {
        font-size: 18px;
        font-weight: 600;
        color: #252641;
        margin: 0 0 12px;
    }

    .course-meta {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #696983;
        font-size: 14px;
    }

    .h-description {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        flex-wrap: nowrap;
        gap: 8px;
    }

    .course-time {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #696983;
        font-size: 14px;
        white-space: nowrap;
    }

    .course-professor-image {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 8px;
    } 

    .professor-info{
        display: flex;
        align-items: center;
    }

    .course-description {
        font-size: 14px;
        color: #555770;
        margin-bottom: 16px;
    }

    .course-price {
        font-size: 18px;
        color: #49BBBD;
        font-weight: bolder;
    }

    

</style>