<template>

<div class="page-title"> 
    <span>
        <h3>{{msg}}</h3>
    </span>
</div>
 
</template>

<script>

export default {
    'name': 'PageTitle',
    props: ['msg']
}

</script>

<style>

.page-title {
    padding-bottom: 20px;
}
</style>
