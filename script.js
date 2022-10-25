class Produtos{

    constructor(){
        this.id = 1;
        this.arrayp = [];
        this.editId = null;
    }
   
    salvar(){
        let produtos = this.lerdados();
        if(this.validar(produtos) == true){
           if(this.editId == null){
                this.adicionar(produtos);
           } else {
                this.atualizar(this.editId, produtos);
            }
            console.log(this.arrayp)
           
        }
        this.lista()
        this.cancelar();
    }

    lista(){
        let tbody = document.querySelector('#tbody');
        tbody.innerHTML = ''
        var valortotal = 0
        var vtotal = document.querySelector('#vtotal')
        
        for(let a = 0; a < this.arrayp.length; a++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_opcoes = tr.insertCell();

            td_id.innerText = this.arrayp[a].id;
            
            td_produto.innerText = this.arrayp[a].nome;

            td_valor.innerText = this.arrayp[a].valor;

            let imgDel = document.createElement('img')
            imgDel.src = 'img/excluir.png'
            imgDel.setAttribute("onclick", "produtos.deletar("+ this.arrayp[a].id +")")

            let imgEdit = document.createElement('img')
            imgEdit.src = 'img/editar-texto.png'
            
            imgEdit.setAttribute("onclick", "produtos.prep_edit("+ JSON.stringify(this.arrayp[a]) +")")

            td_opcoes.appendChild(imgDel)
            td_opcoes.appendChild(imgEdit)

            valortotal += this.arrayp[a].valor
            console.log(vtotal)
            
        }

        vtotal.innerHTML = valortotal.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
 
    }



    adicionar(produtos){
        produtos.valor = parseFloat(produtos.valor)
        this.arrayp.push(produtos);
        this.id++;
    }

    lerdados(){
        let produtos = {}

        produtos.id = this.id
        produtos.nome = document.querySelector('#nprod').value;
        produtos.valor = document.querySelector('#vprod').value;

        return produtos
    }

    validar(produtos){
        let msg = ''
        if(produtos.nome.length == 0 || produtos.valor.length == 0){
            msg =  'Insira os dados!'
        } 
        if(msg != ''){
            alert(msg);
            return false
        } else {
            return true
        }
    }

    cancelar(){
        document.querySelector('#nprod').value = '' 
        document.querySelector('#vprod').value = ''
        document.querySelector('#b1').innerText = 'Salvar'
        this.editId = null
    }

    deletar(id){
        if(confirm('Deseja excluir o produto?') == true){
            let tbody = document.querySelector('#tbody')
       
        for(let a = 0; a < this.arrayp.length; a++ ){
            if(this.arrayp[a].id == id){
                this.arrayp.splice(a, 1)
                tbody.deleteRow(a)
            }
        }

        var valortotal = 0
        var vtotal = document.querySelector('#vtotal')
        for(let a =0; a < this.arrayp.length; a++){
            valortotal += this.arrayp[a].valor
        }
        vtotal.innerHTML = valortotal.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'})
        }
    }

    prep_edit(dados){
        this.editId = dados.id
        document.querySelector("#nprod").value = dados.nome
        document.querySelector("#vprod").value = dados.valor
        document.querySelector('#b1').innerText = 'Atualizar'
    }

    atualizar(id, produtos){
        for(let a = 0; a < this.arrayp.length; a++ ){
            if(this.arrayp[a].id == id){
                this.arrayp[a].nome = produtos.nome;
                this.arrayp[a].valor = produtos.valor;
                this.arrayp[a].valor = parseFloat(this.arrayp[a].valor)
            }
            
        }

    }

    
} 

var produtos = new Produtos ();