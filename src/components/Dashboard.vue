<template>
  <section class="flex h-screen">
    <!-- Sidebar -->
    <aside @mouseenter="expandSidebar" @mouseleave="expandSidebar" class="bg-primary shadow-sm w-20 hover:w-96  duration-100 h-full border-r-2 border-b-2 border-solid border-gray-100">
      <div>
        <div class="bg-primary h-16 flex items-center justify-center border-b-2 border-solid border-gray-100">
          <img v-if="isExpanded" src="https://somosierratech.com/wp-content/uploads/2020/06/SOMOSIERRA-logo.png" alt="logo"
               class="h-full w-3/4 object-contain">
          <img v-if="!isExpanded" src="https://somosierratech.com/wp-content/uploads/2023/10/isotipo-somosierra-color.png" alt="logo"
               class="h-full w-10 object-contain">
        </div>
      </div>
      <div>

      </div>
      <nav>
        <ul>
          <li v-for="(route, index) in routes" :key="index">
            <router-link :to="route.path"
                         @mouseenter="toggleMouseHover(route.name)"
                         @mouseleave="toggleMouseHover(route.name)"
                         :class="{ 'justify-center': !isExpanded }"
                         class="aside-li flex flex-row gap-3 items-center opacity-70 p-4 overflow-x-hidden">
              <img :src="mouseHover[route.name] ? route.iconHover : route.icon" class="h-5 mx-3" alt="icon">
              <p class="text-sm md:text-lg" v-if="isExpanded">
                {{ route.title }}
              </p>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="bg-secondary flex flex-col w-full">
      <!-- Header Nav -->
      <nav class="bg-primary p-4 h-16 border-r-2 border-b-2 border-solid border-gray-100">
        <ul class="flex flex-row justify-end space-x-4">
          <li v-for="(route, index) in routes" :key="index">
            <router-link :to="route.path" class="hover:underline">{{ route.title }}</router-link>
          </li>
        </ul>
      </nav>

      <!-- Contenido dinámico según la ruta -->
      <section class="flex-grow p-4 overflow-auto">
        <router-view></router-view>
      </section>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const mouseHover = ref({});
const isExpanded = ref(false);

// Definir las rutas y sus propiedades
const routes = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    path: '/',
    icon: '/src/assets/icons/hogar.png',
    iconHover: '/src/assets/icons/hogar-white.png'
  },
  {
    name: 'ajustes',
    title: 'Ajustes',
    path: '/template',
    icon: '/src/assets/icons/ajustes.png',
    iconHover: '/src/assets/icons/ajustes-white.png'
  },
  {
    name: 'miCuenta',
    title: 'Mi cuenta',
    path: '/template2',
    icon: '/src/assets/icons/usuario.png',
    iconHover: '/src/assets/icons/usuario-white.png'
  }
];

// Inicializar el estado mouseHover para cada ruta
routes.forEach(route => {
  mouseHover.value[route.name] = false;
});

const toggleMouseHover = (item) => {
  mouseHover.value[item] = !mouseHover.value[item];
};

const expandSidebar = () => {
  isExpanded.value = !isExpanded.value;
};

</script>

<style scoped>
.aside-li {
  position: relative;
  transition: color 0.3s, border-color 0.3s;
  color: #000000;
  border-left: 5px solid transparent;
  padding-left: 10px;
}

.aside-li::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  z-index: -1;
  background-color: theme('colors.customEnterprise.200');
  transition: width 0.3s ease-out, opacity 0.3s ease-out; /* Añadir transición para opacity */
  opacity: 0; /* Inicialmente ocultar el borde rojo */
}

.aside-li:hover::before {
  width: 100%;
  opacity: 1; /* Mostrar el borde rojo al hacer hover */
}

.aside-li:hover {
  border-left-color: theme('colors.customEnterprise.500');
  color: #ffffff;
}
</style>
