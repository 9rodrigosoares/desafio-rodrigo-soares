class CaixaDaLanchonete {

        formasDePagamento = ["dinheiro", "debito", "credito"];
        descontoDinheiro = 0.05;
        acrescimoCredito = 0.03;

    calcularValorDaCompra(metodoDePagamento, itens) {

        const menu = {
            cafe: { descricao: "Café", valor: 3.00 },
            chantily: { descricao: "Chantily", valor: 1.50 },
            suco: { descricao: "Suco Natural", valor: 6.20 },
            sanduiche: { descricao: "Sanduíche", valor: 6.50 },
            queijo: { descricao: "Queijo", valor: 2.00 },
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 },
        };
        
        if (!this.formasDePagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        const carrinho = [];

        let total = 0;
        
        for (const i of itens) {
            const [codigo, quantidade] = i.split(",");
            const item = menu[codigo];
        
            if (!item) {
                return "Item inválido!";
            }
            
            carrinho.push(codigo);

            if (quantidade <= 0) {
                return "Quantidade inválida!";
              }
            
            total += item.valor * quantidade;
        }

        const erroItemExtra = this.validaItemExtra(carrinho);

        if (erroItemExtra) {
            return erroItemExtra;
        }

        if (metodoDePagamento === "dinheiro") {
            total -= total * this.descontoDinheiro;
        } else if (metodoDePagamento === "credito") {
            total += total * this.acrescimoCredito;
        }
    
        return `R$ ${total.toFixed(2).replace(".", ",")}`;
    }

    validaItemExtra(carrinho) {
        if(carrinho.includes("chantily")) {
            if(!carrinho.includes("cafe")) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }
        if(carrinho.includes("queijo")) {
            if(!carrinho.includes("sanduiche")) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }
        return;
    }
}

export { CaixaDaLanchonete };
