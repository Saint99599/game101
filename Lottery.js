class lottery extends Phaser.Scene {

    preload(){
        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js';
        this.load.plugin('rexbbcodetextplugin', url, true);
        this.load.image('woodboard', 'asset/woodboard.png');

    }
    
    create()
    {
        var lotteryX = 3;
        var lotteryY = 5;
        this.lottery_cost = 100;


        
        this.bought_lottery = [];
        this.bought = this.add.text(1100, 300, '', {font: '32px Courier', fill: '#f0f'})
        
        //woodboard
        this.woodboard = this.add.image(config.width/2, 0 - config.height/2, 'woodboard');
        this.woodboard.setOrigin(0.5, 0.5);
        this.woodboard.setScale(0.7);
        //woodboard animation
        while(this.woodboard.y <= config.width/4){
            this.woodboard.y += 25;
        }
        var inputText = this.add.rexBBCodeText(400, 300, 'House' ,{font: '32px Courier', fill: '#fof'})

        //money to buy lottery
        this.money = 1000;
        this.moneyText = this.add.text(1200, 100, '', {font: '32px Courier', fill: '#f0f'})
        this.moneyText.setText(this.money);
        
        var lottery_text = [];
        var x;
        var y;
        // //show first random lottery
        for(var i = 0; i < lotteryX;i++){
            x = (i+1)*300;
            for(var j = 0; j < lotteryY; j++){
                y = ((j+1)*100)+25;
                lottery_text.push(this.add.text(x, y, '', {font: '32px Courier', fill: '#000000'}))
                this.setInteract(lottery_text[((5*i)+j)]);
            }
        }
        
    }
    update(){

        this.moneyText.setText(this.money);
    }

    setInteract(list){
        var random = this.normalRand();
        list.setText(random);
        list.setInteractive();
        list.on('pointerdown', () => {
            if(this.money >= this.lottery_cost){
                this.money -= this.lottery_cost;
                console.log('purchase complete')
                this.addInv_lottery(random);
                random = this.normalRand();
                list.setText(random);
            }
            else{
                console.log("don't have enough money");
            }
        })
    }


    addInv_lottery(text){
        //add to list
        
        this.bought_lottery.push(text);
        var list = '';
        console.log(this.bought_lottery);
        for(var i = 0 ; i < this.bought_lottery.length; i++){
            list += '\n';
            list += this.bought_lottery[i];
        }
        this.bought.setText(list);
    }
    normalRand(){
        var assem = '';

        for(var i = 0; i < 3; i++){
            assem += (Math.floor(Math.random() * 10));
            
        }
                
        //check lottery 

        
        return assem;
    }
    twodigit(){

        //random another 3 digits
        var arr = [];

        //j -> all lottery in table
        for(var j = 0; j < 5; j++){

            //assemble all digits in lottery
            var assem = '';

            //i -> random number digits
            for(var i = 0; i < 4; i++){

                assem += (Math.floor(Math.random() * 10));
                
            }
            //another 2 digits want to search
            assem += '969'
            arr.push(assem);
        }
        //check lottery


        return assem;
    }

    check_list(){
        //check same lottery in one random
        
        //check lottery already bought

    }
    search(){

    }
}
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1280,
    height: 720,
    scene: [ lottery ]
};
        
const start = new Phaser.Game(config)
// var button = new Button(gameObject, config);