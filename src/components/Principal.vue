<template>
    <div>
        <div class="prose">
            <p>Este site, em <i>beta</i>, apresenta dados sobre as Instituições de Ensino Superior e os Polos Presenciais
                que fazem parte do Sistema Universidade Aberta do Brasil (UAB).</p>
            <p>A nossa meta com esse projeto é dar maior visibilidade a uma iniciativa de educação pública ainda pouco
                estudada e divulgada. Buscamos com isso, trazer maior "abertura" para o funcionamento do Sistema UAB,
                bem como maior transparência sobre a sua abrangência, capilaridade e ações.</p>
            <p>Abaixo, nessa página, você encontra algumas informações básicas sobre a UAB, incluindo uma linha do tempo da
                EaD com enfoque na UAB.</p>
            <p>Para navegar utilize o mapa a esquerda, clicando em qualquer ponto de interesse. Caso tenha alguma dúvida ou
                comentário sobre o projeto, utilize <a class="unprose link" href="http://educacaoaberta.org/contato/">esse formulário</a>. Caso identifique
                algum problema, dado incongruente, ou queira ajudar a melhorar o sistema, entre em contato colocando um <i>problema/comentário</i>
                na nossa página no <a class="unprose link" href="https://github.com/educacaoaberta/CiclopeDB/issues">Github</a>.</p>

            <i>Nosso grupo de pesquisa é independente e não representa a posição ou opiniões da CAPES ou do Sistema Universidade Aberta do Brasil</i>.<br>
        </div>

        <div>
            <iframe title="Linha do Tempo UAB" src="https://cdn.knightlab.com/libs/timeline3/latest/embed/?source=1pkIQBlBj9jfhici2CRiyj1ZStpB5pmE37uJ0dAC-QUo&font=Bevan-PontanoSans&lang=pt-br&initial_zoom=2&height=650" width='100%' height='650' frameborder='0'></iframe>
        </div>

        <div class="txt-l txt-bold">Sobre a UAB</div>
        <div class="prose">
            <p>A Universidade Aberta do Brasil (UAB) foi criada em 2006, inspirada por várias experiências no Brasil e no
                exterior.
                De particular importância para a estruturação do modelo UAB foi o consórcio <a class="unprose link" href="http://cederj.edu.br/">CEDERJ</a> do estado do Rio de Janeiro. Outras experiências pioneiras
                incluíram aquelas desenvolvidas pela UFMT para formação de professor no estado de Mato Grosso, e o projeto Veredas, em
                Minas Gerais. O objetivo inicial da UAB foi o de proporcionar o acesso a educação superior em locais onde esse
                acesso era limitado, uma tarefa não trivial em um país com dimensões continentais como o Brasil e com grande
                concentração populacional.</p>
            <p>A UAB oferece cursos primariamente para professores em serviço, com enfoque no ensino básico, buscando
                atingir as demandas de sua profissão e os termos estabelecidos pela Lei de Diretrizes e Bases da Educação brasileira, (<a class="unprose link" href="http://portal.mec.gov.br/arquivos/pdf/ldb.pdf">Lei 9.394/1996</a>). A existência de
                professores que atuam sem diploma superior e/ou em áreas para as quais não receberam formação ainda é um problema na
                educação brasileira. A mesma LDB/1996 reconheceu a importância da educação à distância no Brasil e estabeleceu
                parâmetros inicias para sua regulamentação.</p>
            <p>No sistema UAB, os Institutos de Educação Superior (IES) são responsáveis por planejar e implementar os
                cursos oferecidos, garantindo sua execução e qualidade. Nas universidades esta gestão é estabelecida de várias
                maneiras: distribuída entre os departamentos atuantes (como por exemplo, Pedagogia), ou de maneira centralizada,
                através de Núcleos ou Secretarias. As agências locais, ou seja, estados e municípios, devem oferecer o espaço físico,
                sua manutenção e o quadro de funcionários.</p>
            <p> O governo federal, particularmente a Coordenação de Aperfeiçoamento de Pessoal de Nível Superior
                (CAPES/Ministério da Educação), é responsável pelo financiamento para as universidades (desenvolvimento de material, custo de
                pessoal, entre outros) e pelo estabelecimento das regras de funcionamento da universidade.</p>
            <p>Ao contrário de outras universidades abertas ao redor do mundo (como a Open University, Inglaterra) a UAB não
                constitui uma instituição em si. As instâncias (IES, municípios, etc.) agem em forma de consórcio,
                articulando os institutos de ensino superior, como as universidades federais públicas do país.</p>
        </div>


        <div class="graph">

            <div class="py12">
                <div class="txt-l txt-bold">Dados gerais da UAB: número de IPES por estado</div>
                <!--Total de IPES no ano corrente-->
                <p id="legendByState"></p>
                <!-- Gráfico de Barras-->
                <canvas id="chartByState"></canvas>
            </div>

            <div class="py12">
                <div class="txt-l txt-bold">Dados gerais da UAB: Número de IPES por região</div>
                <canvas id="chartByRegion"></canvas>
            </div>

            <div class="py12">
                <div class="txt-l txt-bold">Dados gerais da UAB: número de polos por estado</div>
                <p id="legendPolosByState"></p>
                <!-- Gráfico de Barras-->
                <canvas id="chartPolosByState" width="600" height="300"></canvas>
            </div>

            <div class="py12">
                <div class="txt-l txt-bold">Dados gerais da UAB: Número de polos por região</div>
                <canvas id="chartPolosByRegion"></canvas>
            </div>
        </div>

        <footer class="bg-blue-faint px12 py12 round-b-ml txt-s">
            <p>
                O site e seu conteúdo estão licenciados com licença Creative Commons Atribuição (<a class="unprose link"
                    href="https://creativecommons.org/licenses/by/4.0/">CC-BY</a>) - Educação Aberta.
            </p>
            <p>
                Dados atualizados em 15/01/2018.
            </p>

        </footer>
    </div>
</template>

<script>
  import {
    loadChart, processBarChartIpes, processBarChartIpesRegion, processBarChartPolos,
    processBarChartPolosRegion
  } from '../functions';

  export default {
    mounted() {
      // carrega o gráfico dos números de IPES por estado
      var myIpesStateBarChart = loadChart("chartByState", "bar", "IPES")
      processBarChartIpes(myIpesStateBarChart);

      // carrega o gráfico dos números de IPES por região
      var myIpesRegionBarChart = loadChart("chartByRegion", "bar", "IPES")
      processBarChartIpesRegion(myIpesRegionBarChart);

      // carrega o gráfico dos número de polos por estado
      var myPoloStateBarChart = loadChart("chartPolosByState", "bar", "Polos")
      processBarChartPolos(myPoloStateBarChart);

      // carrega o gráfico dos número de polos por região
      var myPoloRegionBarChart = loadChart("chartPolosByRegion", "bar", "Polos")
      processBarChartPolosRegion(myPoloRegionBarChart);
    }
  };
</script>
