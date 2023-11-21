<template>
  <div class="custom-container text-center max-w-screen-lg mx-auto bg-gray-800 text-white p-8 rounded-lg">
    <h1 class="text-4xl font-bold mb-6">TV Aberta</h1>
    
    <p class="mb-6 text-gray-300">Lista de canais</p>

    <ul v-if="channels" class="list-disc ml-6">
      <li v-for="channel in channels" :key="channel.id_canal" class="channel-item mb-4 flex items-center">
        <img :src="channel.url_imagem" alt="Logo do Canal" class="w-10 h-10 mr-4 rounded-full">
        <span class="text-gray-300">{{ channel.id_canal }} - {{ channel.st_canal }} - {{ channel.nome }}</span>
      </li>
    </ul>

    <p v-else class="text-gray-500">Aguardando dados...</p>
  </div>
</template>



<script>
import '../assets/css/output.css';
import axios from 'axios';

export default {
  data() {
    return {
      channels: null,
    };
  },
  mounted() {
    axios
      .get('/api', {
        params: {
          q: 'id_cidade:1',
          callback: 'callbackChannels',
          'json.wrf': 'callbackChannels',
          wt: 'json',
          rows: 10,
          start: 0,
          sort: 'cn_canal asc',
          fl: 'id_canal st_canal cn_canal nome url_imagem',
          fq: 'nome:*',
          _: Date.now(),
        },
        headers: {
          'Sec-Fetch-Mode': 'no-cors',
          Referer: 'https://www.net.com.br/tv-por-assinatura/programacao/grade',
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
        },
      })
      .then(response => {
        const jsonData = JSON.parse(response.data.substring(response.data.indexOf('(') + 1, response.data.lastIndexOf(')')));
        this.channels = jsonData.response.docs;
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  },
};
</script>

