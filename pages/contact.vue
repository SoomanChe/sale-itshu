<script lang="ts" setup></script>

<template>
  <div id="form" class="py-20 bg-indigo-50/50 sm:px-6 lg:px-8 min-h-content-body">
    <!--Background dot-->
    <svg class="absolute transform translate-x-1/2 translate-y-12 lg:block right-full hidden" width="404" height="504" fill="none" viewBox="0 0 404 504"><defs><pattern
      id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
      x="0"
      y="0"
      width="20"
      height="20"
      patternUnits="userSpaceOnUse"
    >
      <rect
        x="0"
        y="0"
        width="4"
        height="4"
        class="text-gray-200"
        fill="currentColor"
      /></pattern></defs><rect width="404" height="504" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
    </svg>
    <div class="min-h-full flex flex-col justify-center md:py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <icon name="majesticons:key-line" class="mx-auto h-10 w-10 text-indigo-600" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-800">
          Contact Support
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 @sm:px-4">
          아래 전송폼에 문제 발생시, <a href="mailto:support@sale-itshu.com" class="font-medium text-indigo-600 hover:text-indigo-500 underline-offset-2 underline">support@sale-itshu.com</a> 으로 직접 전송해 주시면 감사하겠습니다.
        </p>
      </div><div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div class="bg-white py-8 px-4 shadow sm:rounded-md sm:px-10 border-t-8 border-indigo-500">
          <form class="space-y-8" action="https://pay.digitalinspiration.com/contact" method="POST">
            <label class="block ">
              보내는 분 메일 주소
              <v-input />
            </label>
            <label class="block">
              보내는 분 메일 주소
              <v-input />
            </label>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
