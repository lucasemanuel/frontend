
<script setup lang="ts">
import { Plane, LogOut } from 'lucide-vue-next'

import { useLoggedUserStore } from '@/stores/LoggedUser'
import api from '@/services/api'
const loggedUserStore = useLoggedUserStore()

function logout() {
  localStorage.removeItem('isLogged')
  api.post('/auth/logout').then().finally(() => {
    localStorage.removeItem('isLogged')
    loggedUserStore.clearUser();

  })
}
</script>

<template>
  <div class="mx-auto flex min-h-screen w-full min-w-[320px] flex-col bg-slate-100">
    <header id="page-header" class="z-1 flex flex-none items-center pt-5">
      <div class="container mx-auto px-4 lg:px-8 xl:max-w-7xl">
        <div
          class="-mx-4 border-y border-slate-200 bg-white px-4 sm:rounded-xl sm:border shadow-sm lg:-mx-6 lg:px-6"
        >
          <div class="flex justify-between py-2.5 lg:py-3.5">
            <div class="flex items-center gap-2 lg:gap-6">
              <a
                href="#"
                class="group inline-flex items-center gap-1.5 text-lg font-bold tracking-wide text-slate-900 hover:text-slate-600"
              >
                <Plane class="h-4 w-4 text-muted-foreground text-purple-700" />
                <span>Viajei</span>
              </a>
            </div>

            <div class="flex items-center gap-2">
              <div class="relative inline-block">
                <span class="px-2 py-2 text-sm leading-5 font-semibold text-slate-800">John Doe</span>
              </div>
              <a
                @click="logout"
                href="#"
                class="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm leading-5 font-semibold text-slate-800 hover:border-violet-300 hover:text-violet-800 active:border-slate-200"
              >
                <LogOut class="h-4 w-4 text-muted-foreground text-slate-700" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main class="flex max-w-full flex-auto flex-col">
      <slot></slot>
    </main>
  </div>
</template>
