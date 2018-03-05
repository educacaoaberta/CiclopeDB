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
        EventBus.$on('idPolo', idPolo => {
            this.id = idPolo
            this.sigla = null
        });

        EventBus.$on('siglaIpes', siglaIpes => {
            this.sigla = siglaIpes.sigla
            this.id = null
            this.arquivo = siglaIpes.arquivo
        });
    },
    watch: {
        id: function () {
            axios.get('/model/polos.php?operation=polodata&id=' + this.id)
                .then(response => {
                    this.nome = response.data[0].nome_polo
                    this.endereco.logradouro = response.data[0].logradouro
                    this.endereco.numero = response.data[0].numero
                    this.bairro = response.data[0].bairro
                    this.cidade = response.data[0].cidade
                    this.estado = response.data[0].uf
                    this.cep = response.data[0].cep
                    this.endereco.complemento = response.data[0].complemento
                    this.nome_fantasia = response.data[0].nome_fantasia
                })
                .catch(error => {
                    console.log(error);
                });
        },
        sigla: function () {
            // $('#info-ipes').load('content/' + this.arquivo);
            $("#about-data").hide()
            axios.get('/model/ipes.php?operation=ipesdata&sigla=' + this.sigla)
                .then(response => {
                    this.nome = response.data[0].sigla
                    this.endereco.logradouro = response.data[0].logradouro
                    this.bairro = response.data[0].bairro
                    this.cidade = response.data[0].cidade
                    this.estado = response.data[0].estado
                    this.cep = response.data[0].cep
                    this.telefone = response.data[0].telefone
                    this.url = response.data[0].url
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    filters: {
        formataCep: function (cep) {
            if (!cep) return ''
            var primeiraparte = cep.substr(0, 5);
            var segundaparte = cep.substr(5, 3)
            var cepcompleto = primeiraparte + "-" + segundaparte
            return cepcompleto;
        },
        formataEndereco: function(logradouro, numero) {
            if (!logradouro || !numero) return ''
            return logradouro + ', ' + numero
        }
    },
})