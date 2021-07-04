export class lottery extends Phaser.Scene {
    constructor(){
        super('scene');
    }
    preload(){
        // this.load.image('woodboard', 'asset/woodboard.png');

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
}
