<template>
  <div class="custom-container text-center max-w-screen-lg mx-auto bg-gray-800 text-white p-8 rounded-lg">
    <h1 class="text-4xl font-bold mb-6">Programação</h1>

    <ul v-if="shows" class="list-disc ml-6">
      <li v-for="show in shows" :key="show.id_programa" class="show-item mb-4">
        <span class="text-gray-300">{{ show.dh_inicio }} - {{ show.st_titulo }} - {{ show.titulo }}</span>
      </li>
    </ul>

    <p v-else class="text-gray-500">Aguardando dados...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      shows: null,
    };
  },
  mounted() {
    axios
      .get('https://programacao.netcombo.com.br/gatekeeper/exibicao/select', {
        params: {
          q: 'id_revel:1_1015 id_revel:1_1196 id_revel:1_1682 id_revel:1_1683 id_revel:1_2302 id_revel:1_1765 id_revel:1_1693 id_revel:1_1754 id_revel:1_1731 id_revel:1_1833',
          callback: 'callbackShows',
          'json.wrf': 'callbackShows',
          wt: 'json',
          rows: 100000,
          sort: 'id_canal asc, dh_inicio asc',
          fl: 'dh_fim dh_inicio st_titulo titulo id_programa id_canal',
          fq: 'dh_inicio:[2019-09-06T00:00:00Z TO 2019-09-06T23:59:00Z]',
        },
        headers: {
          Referer: 'https://www.net.com.br/tv-por-assinatura/programacao/grade',
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
        },
      })
      .then(response => {
        const jsonData = JSON.parse(response.data.substring(response.data.indexOf('(') + 1, response.data.lastIndexOf(')')));
        this.shows = jsonData.response.docs;
        console.log(this.shows);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  },
};
</script>
