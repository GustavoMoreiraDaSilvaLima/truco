export default class Adaptors {

    async CriarBaralho() {
        let baralho = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?cards=3S,3D,3H,3C,2S,2D,2H,2C,AS,AD,AH,AC,KS,KD,KH,KC,JS,JD,JH,JC,QS,QD,QH,QC,7S,7D,7H,7C,6S,6D,6H,6C,5S,5D,5H,5C,4S,4D,4H,4C`);
        baralho = await baralho.json();
        if(baralho.success){
            return baralho;
        }
        return false;
    }
    
    async PegarCartas(deck_id) {
        let cartas = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=3`);
        cartas = await cartas.json();
        if(cartas.success){
            return cartas;
        }
        return false;
    }

    async PegarCartasVira(deck_id) {
        let cartas = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
        cartas = await cartas.json();
        if(cartas.success){
            return cartas;
        }
        return false;
    }

    async devolverDeck(deck_id) {
        let cartas = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/return/`);
        cartas = await cartas.json();
        if(cartas.sucess) {
            return cartas;
        }
        return false;
    }
    
    async embaralharDeck(deck_id) {
        let cartas = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`);
        cartas = await cartas.json();
        if(cartas.sucess) {
            return cartas;
        }
        return false;
    }



}