<template>
  <div>
    <section id="sobre">
      <section id="introducao" class="pb12">
          <p>Este é um projeto do grupo de pesquisa Formação docente e tecnologias de informação e comunicação (<a class="link" href="http://dgp.cnpq.br/dgp/espelhogrupo/8749855854098226">veja lista completa de participantes no CNPq</a>)
            que desde 2011 estuda a Universidade Aberta do Brasil (<a class="link" href="http://www.uab.capes.gov.br/">UAB</a>). O grupo é coordenado pela UFF
            com parceria da UEL, UNICAMP. Este mapeamento foi conduzido pela <a class="link" href="http://educacaoaberta.org/">Cátedra UNESCO em Educação Aberta</a> na
            UNICAMP.</p>
      </section>

      <section id="projeto" class="pb12">
        <div class="txt-l txt-bold">O projeto</div>
        <p>O mapa apresenta duas bases de dados:</p>
        <p>Primeiro, uma <b>base de informações</b> com dados coletados através de pedidos via <a class="link"
                href="http://www.acessoainformacao.gov.br/">Lei de Acesso a Informação</a> e outros
          extraídos do sistema <a class="link" href="http://sisuab.uab.capes.gov">SisUAB</a> em março de 2016.
          Trazemos a tona um mapa com todas as IPES (Instutições Públicas de Ensino Superior)
          e todos os polos <i>ativos</i>, que juntos, compõe o Sistema UAB.
          <!-- Para cada um desses, apontamos um histórico
          detalhado sobre cursos e alunos participantes.
          Vale ressaltar que não incluímos os cursos que não tiveram oferta real de início,
          ou seja, cursos que podem ter sido planejados mas não chegaram a ser efetivados.-->
          Os dados de geolocalização são aproximados. Buscamos apontar com a maior especificidade possível, a localização das
          IPES (feitas manualmente).
          Os polos forma geolocalizados automaticamente e referem a cidade, sem precisão no nível de logradouro.</p>

        <p>Segundo <b>informações detalhadas sobre os Núcleos de Educação a Distância</b> de 8 universidades que participaram
          de uma pesquisa realizada
          pelo nosso grupo focada na gestão de recursos educacionais no âmbito da UAB. Para essas instituições
          incluímos um texto introdutório e uma detalhada linha do tempo de sua participação na UAB.
          Esses espaços são responsáveis pela articulação, dentro da universidade, para a efetivação dos cursos oferecidos
          pela UAB.
          Como cada universidade tem autonomia para definir seu modelo de ação, cada um desses núcleos se
          estrutura de maneira diferente. O objetivo desses estudo é descrever e avaliar questões relativas ao
          funcionamento e estrutura desses centros, com particular atenção aos processos de produção e disseminação de
          recursos educacionais.</p>

        <!-- Fizemos o possível para garantir que os dados estão corretos. <b>É importante ressaltar que os dados do SisUAB e os que coseguimos via LAI podem apresentar inconsistências</b>.
        Não se trata de um problema no sistema, mas sim na consistência original dos dados. No entanto, são os melhores dados que temos! Buscaremos trabalhar junto à CAPES para aperfeiçoar os dados disponíveis e anotar inconsistências.  -->
        <p>Caso identifique algum problema, dado incongruente, ou queira ajudar a melhorar o sistema, entre em contato
          colocando um <i>problema/comentário</i> na nossa página no <a class="link" href="https://github.com/gabrielfedel/ciclopedb/issues">Github</a>.</p>
      </section>

      <section id="software" class="pb12">
        <div class="txt-l txt-bold">O software</div>
        <p>O sistema que desenvolvemos, apelidado de <b>Ciclope</b>, é um software livre, que agrega a funcionalidade de
          diversas ferramentas
          Existem duas versões do sistema. A primeira não depende de banco de dados e faz uso inteiramente de dados
          disponíveis no formato JSON usando arquivos-texto para armazenamento dos dados. O sistema faz uso de HTML +
          Javascript (<a class="link" href="https://github.com/tamielbr/Ciclope/">Ciclope</a>).
          Com base nesse primeiro, desenvolvemos o <b>CiclopeDB</b>, que utilizamos nesse site. O software faz uso de um
          banco de dados SQL + Javascript + HTML + PHP. É possível verificar e adicionar problemas, questões e sugestões sobre
          o software no site do <a class="link" href="https://github.com/gabrielfedel/ciclopedb">CiclopeDB no Github</a>.
          Ambos estão licenciadas com a licença <a class="link" href="https://opensource.org/licenses/GPL-3.0">GPL v3.0</a>.</p>
      </section>

      <section id="pesquisadores" class="pb12">
        <div class="txt-l txt-bold">Pesquisadores envolvidos no Ciclope</div>
        <div><b>Tel Amiel (NIED/UNICAMP)</b> - Coordenador e desenvolvedor | <a class="link" href="http://twitter.com/edaberta">@edaberta</a></div>
        <div><b>Gabriel Fedel</b> - Desenvolvedor principal | <a class="link" href="https://github.com/gabrielfedel">@gabrielfedel</a></div>
      </section>

      <section id="saibaMais" class="pb12">
        <div class="txt-l txt-bold">Saiba mais sobre a Universidade Aberta do Brasil</div>
        <div class="pb12">
          <b>Sobre a UAB e sua implementação</b>
          <p class="txt-s">Costa, C. J. da, & Duran, M. R. C. (2011). <b>A Política Nacional de Formação de Professores entre 2005 e
            2010: a nova Capes e o Sistema Universidade Aberta do Brasil.</b> Revista Brasileira de Pós-Graduação, 9(16), 263–313.
            Disponível em: <a class="link" href="http://ojs.rbpg.capes.gov.br/index.php/rbpg/article/view/289/0">http://ojs.rbpg.capes.gov.br/index.php/rbpg/article/view/289/0</a>
          </p>
        </div>

        <div class="pb12">
          <b>Sobre Núcleos UAB e produção de recursos educacionais</b>
          <p class="txt-s">Soares, T. & Amiel .T (2017). <b>Recursos educacionais na Universidade Aberta do Brasil: Perspectivas e
            práticas.</b> Disponível em: <a class="link" href="http://educacaoaberta.org/perspectivas-rea-uab/">http://educacaoaberta.org/perspectivas-rea-uab/</a>
          </p>
        </div>

        <div class="pb12">
          <b>Sobre os polos UAB</b>
          <p class="txt-s">Duran, M. R. da C., Costa, C. J. da, Massaro, T., & Amiel, T. (2012). <b>Os polos do sistema UAB e seus
            coordenadores nas regiões nordeste, norte e sul do Brasil (pp. 1–15).</b> Presented at the Simpósio Internacional de
            Educação a Distância, UFScar. Disponível em: <a class="link"
                    href="http://sistemas3.sead.ufscar.br/ojs/Trabalhos/277-937-3-ED.pdf">http://sistemas3.sead.ufscar.br/ojs/Trabalhos/277-937-3-ED.pdf</a>
          </p>
        </div>
      </section>

    </section>
  </div>
</template>
