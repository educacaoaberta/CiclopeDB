var app = new Vue({
    el: '#app',
    data: {
        id: '',
        sigla: '',
        arquivo: '',
        nome_polo: '',
        nome: '',
        endereco: {
            logradouro: '',
            numero: '',
            complemento: ''
        },
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        nome_fantasia: '',
        telefone: '',
        url: ''
    },
    mounted() {
        EventBus.$on('infoPolo', infoPolo => {
            $("#about-data").addClass('hide-visually');
            $("#tabs-data").removeClass('hide-visually');
            $("#tabs-polos").tabs("option", "active", 0);

            this.sigla = null
            this.id = infoPolo
            this.nome = infoPolo.nome_polo
            this.endereco.logradouro = infoPolo.logradouro
            this.endereco.numero = infoPolo.numero
            this.bairro = infoPolo.bairro
            this.cidade = infoPolo.cidade
            this.estado = infoPolo.uf
            this.cep = infoPolo.cep
            this.endereco.complemento = infoPolo.complemento
            this.nome_fantasia = infoPolo.nome_fantasia
        });

        EventBus.$on('infoIpes', infoIpes => {
            $("#about-data").addClass('hide-visually');
            $("#tabs-data").removeClass('hide-visually');
            $("#tabs-polos").tabs("option", "active", 0);

            this.id = null
            this.sigla = infoIpes.sigla
            this.arquivo = infoIpes.arquivo
            this.nome = infoIpes.sigla
            this.endereco.logradouro = infoIpes.logradouro
            this.bairro = infoIpes.bairro
            this.cidade = infoIpes.cidade
            this.estado = infoIpes.estado
            this.cep = infoIpes.cep
            this.telefone = infoIpes.telefone
            this.url = infoIpes.url
        });
    },
    filters: {
        formataCep: function (cep) {
            if (!cep) return ''
            var primeiraparte = cep.substr(0, 5);
            var segundaparte = cep.substr(5, 3)
            var cepcompleto = primeiraparte + "-" + segundaparte
            return cepcompleto;
        },
        formataTelefone: function (telefone) {
          if (!telefone) return ''
            var primeiraparte = telefone.substr(0, 9);
            var segundaparte = telefone.substr(9, 4)
            var telefonecompleto = primeiraparte + "-" + segundaparte
          return telefonecompleto;
        },
        formataEndereco: function(logradouro, numero) {
            if (!logradouro || !numero) return ''
            return logradouro + ', ' + numero
        }
    },
})