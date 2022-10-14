Page({
    global : {
        flag: true,/*为真说明玩家A投掷完了，为假说明到玩家B投掷完了*/
        setdice: true/*为真说明玩家A放置骰子完成，为假说明到玩家B放置骰子*/
    },
    data: {
      dice : ['first','second','third','fourth','fifth','sixth'],
      dice_in_nine : ['first-1','second-1','third-1','fourth-1','fifth-1','sixth-1'],
      dice_1: ["/images/dices/shaking1.png","/images/dices/shaking2.png","/images/dices/shaking3.png","/images/dices/shaking4.png","/images/dices/shaking5.png","/images/dices/shaking6.png"],
      incident : {"box_1":"locationClick","box_2":"locationClick","box_3":"locationClick","box_4":"locationClick","box_5":"locationClick","box_6":"locationClick","box_7":"locationClick","box_8":"locationClick","box_9":"locationClick","box_10":"locationClick","box_11":"locationClick","box_12":"locationClick","box_13":"locationClick","box_14":"locationClick","box_15":"locationClick","box_16":"locationClick","box_17":"locationClick","box_18":"locationClick"},
      num1 : 0,
      player_a :[0,0,0,0,0,0,0,0,0],
      player_b :[0,0,0,0,0,0,0,0,0],
      score_a : 0, //玩家A的分数
      score_b : 0, //玩家B的分数
      showdata : {"box_1":0,"box_2":0,"box_3":0,"box_4":0,"box_5":0,"box_6":0,"box_7":0,"box_8":0,"box_9":0,
                 "box_10":0,"box_11":0,"box_12":0,"box_13":0,"box_14":0,"box_15":0,"box_16":0,"box_17":0,"box_18":0,},
      box_1: "none",
      box_2: "none",
      box_3: "none",
      box_4: "none",
      box_5: "none",
      box_6: "none",
      box_7: "none",
      box_8: "none",
      box_8: "none",
      box_9: "none",
      box_10: "none",
      box_11: "none",
      box_12: "none",
      box_13: "none",
      box_14: "none",
      box_15: "none",
      box_16: "none",
      box_17: "none",
      box_18: "none",
      allow_click: "auto",
      winner: "A",
      show:false,
      flag: 1,//判断是人机还是真人。
      boxs :[1,2,3,4,5,6,7,8,9]
      },
    shakeClick: function () { 
      var me = this;
      var i = 250;
      while(i--){
        var num1 = Math.floor(Math.random()*6);
        me.setData({num1 : num1});
      }
      this.setData({
        dice: this.data.dice
      });
    },
    locationClick:function(e){
      if(this.data.flag == 0){
        this.shakeClick();
      }
      var tap;
      if(this.data.flag){
        e = e || Event;
        tap = e["currentTarget"]["id"];
        tap = tap.replace('-','_');
        this.setData({flag:0})
      }else{
        var temp_arr = [];
        for(var index=0;index<9;index++){
          if(this.data.boxs[index] == 0){
            continue;
          }
          temp_arr.push(this.data.boxs[index]);
        }
        var num = Math.floor(Math.random()*temp_arr.length);
        tap ="box_" + (temp_arr[num]).toString();
        this.setData({flag:1})
      }
      switch(tap){
            case "box_1":
            this.setData(
              {['incident.box_1'] : 0,['showdata.box_1'] : this.data.num1,box_1 : "true",['resp.wrap']:"none",
              'player_a[0]':this.data.num1+1,'boxs[0]':0}
            );
            var position = "box_1".slice(4)-1;
            position = position % 3;
            for(var index=position; index<9; index+=3){
                if(this.data.player_b[index] == this.data.num1+1)
                {
                  let temp_list = this.data.player_b;
                  temp_list[index] = 0;
                  let temp_box = "box_" + `${index+10}`;
                  if(temp_box == "box_10"){
                    this.setData({player_b:temp_list, box_10:"none",['incident.box_10'] : "locationClick"});
                  }else if(temp_box == "box_13"){
                    this.setData({player_b:temp_list, box_13:"none",['incident.box_13'] : "locationClick"});
                  }else if(temp_box == "box_16"){
                    this.setData({player_b:temp_list, box_16:"none",['incident.box_16'] : "locationClick"});
                  }
                }
            }
            this.compute_score_b(this.data.player_b)
            this.compute_score_a(this.data.player_a)
            this.gameover();
            break;
            case "box_2":
            this.setData(
              {['incident.box_2'] : 0,['showdata.box_2'] : this.data.num1,box_2 : "true",['resp.wrap']:"none",
              'player_a[1]':this.data.num1+1,'boxs[1]':0}
            );
             // 消除玩家B的骰子，并计算出B被消除后的分数
             var position = "box_2".slice(4)-1;
             position = position % 3;
             for(var index=position; index<9; index+=3){
                 if(this.data.player_b[index] == this.data.num1+1)
                 {
                   let temp_list = this.data.player_b;
                   temp_list[index] = 0;
                   let temp_box = "box_" + `${index+10}`;
                   if(temp_box == "box_11"){
                     this.setData({player_b:temp_list, box_11:"none",['incident.box_11'] : "locationClick"});
                   }else if(temp_box == "box_14"){
                     this.setData({player_b:temp_list, box_14:"none",['incident.box_14'] : "locationClick"});
                   }else if(temp_box == "box_17"){
                     this.setData({player_b:temp_list, box_17:"none",['incident.box_17'] : "locationClick"});
                   }
                 }
             }
             this.compute_score_b(this.data.player_b)
             this.compute_score_a(this.data.player_a)
             this.gameover();
            break;
            case "box_3":
            this.setData(
              {['incident.box_3'] : 0,['showdata.box_3'] : this.data.num1,box_3 : "true",['resp.wrap']:"none",
            'player_a[2]':this.data.num1+1,'boxs[2]':0});
            var position = "box_3".slice(4)-1;
            position = position % 3;
            for(var index=position; index<9; index+=3){
                if(this.data.player_b[index] == this.data.num1+1)
                {
                  let temp_list = this.data.player_b;
                  temp_list[index] = 0;
                  let temp_box = "box_" + `${index+10}`;
                  if(temp_box == "box_12"){
                    this.setData({player_b:temp_list, box_12:"none",['incident.box_12'] : "locationClick"});
                  }else if(temp_box == "box_15"){
                    this.setData({player_b:temp_list, box_15:"none",['incident.box_15'] : "locationClick"});
                  }else if(temp_box == "box_18"){
                    this.setData({player_b:temp_list, box_18:"none",['incident.box_18'] : "locationClick"});
                  }
                }
            }
            this.compute_score_b(this.data.player_b)
            this.compute_score_a(this.data.player_a)
            this.gameover();
            break;
            case "box_4":
            this.setData(
              {['incident.box_4'] : 0,['showdata.box_4'] : this.data.num1,box_4 : "true",['resp.wrap']:"none",
            'player_a[3]':this.data.num1+1,'boxs[3]':0}
            );
            var position = "box_4".slice(4)-1;
            position = position % 3;
            for(var index=position; index<9; index+=3){
                if(this.data.player_b[index] == this.data.num1+1)
                {
                  let temp_list = this.data.player_b;
                  temp_list[index] = 0;
                  let temp_box = "box_" + `${index+10}`;
                  if(temp_box == "box_10"){
                    this.setData({player_b:temp_list, box_10:"none",['incident.box_10'] : "locationClick"});
                  }else if(temp_box == "box_13"){
                    this.setData({player_b:temp_list, box_13:"none",['incident.box_13'] : "locationClick"});
                  }else if(temp_box == "box_16"){
                    this.setData({player_b:temp_list, box_16:"none",['incident.box_16'] : "locationClick"});
                  }
                }
            }
            this.compute_score_b(this.data.player_b)
            this.compute_score_a(this.data.player_a)
            this.gameover();
            break;
            case "box_5":
            this.setData(
              {['incident.box_5'] : 0,['showdata.box_5'] : this.data.num1,box_5 : "true",['resp.wrap']:"none",'player_a[4]':this.data.num1+1,'boxs[4]':0}
            );
            // 消除玩家B的骰子，并计算出B被消除后的分数
            var position = "box_5".slice(4)-1;
            position = position % 3;
            for(var index=position; index<9; index+=3){
                if(this.data.player_b[index] == this.data.num1+1)
                {
                  let temp_list = this.data.player_b;
                  temp_list[index] = 0;
                  let temp_box = "box_" + `${index+10}`;
                  if(temp_box == "box_11"){
                    this.setData({player_b:temp_list, box_11:"none",['incident.box_11'] : "locationClick"});
                  }else if(temp_box == "box_14"){
                    this.setData({player_b:temp_list, box_14:"none",['incident.box_14'] : "locationClick"});
                  }else if(temp_box == "box_17"){
                    this.setData({player_b:temp_list, box_17:"none",['incident.box_17'] : "locationClick"});
                  }
                }
            }
            this.compute_score_b(this.data.player_b)
            this.compute_score_a(this.data.player_a)
            this.gameover();
            break;
            case "box_6":
            this.setData(
              {['incident.box_6'] : 0,['showdata.box_6'] : this.data.num1,box_6 : "true",['resp.wrap']:"none",'player_a[5]':this.data.num1+1,'boxs[5]':0}
            );
            var position = "box_6".slice(4)-1;
            position = position % 3;
            for(var index=position; index<9; index+=3){
                if(this.data.player_b[index] == this.data.num1+1)
                {
                  let temp_list = this.data.player_b;
                  temp_list[index] = 0;
                  let temp_box = "box_" + `${index+10}`;
                  if(temp_box == "box_12"){
                    this.setData({player_b:temp_list, box_12:"none",['incident.box_12'] : "locationClick"});
                  }else if(temp_box == "box_15"){
                    this.setData({player_b:temp_list, box_15:"none",['incident.box_15'] : "locationClick"});
                  }else if(temp_box == "box_18"){
                    this.setData({player_b:temp_list, box_18:"none",['incident.box_15'] : "locationClick"});
                  }
                }
            }
            this.compute_score_b(this.data.player_b)
            this.compute_score_a(this.data.player_a)
            this.gameover();
            break;
            case "box_7":
            this.setData(
              {['incident.box_7'] : 0,['showdata.box_7'] : this.data.num1,box_7 : "true",['resp.wrap']:"none",
            'player_a[6]':this.data.num1+1,'boxs[6]':0});
            var position = "box_7".slice(4)-1;
            position = position % 3;
            for(var index=position; index<9; index+=3){
                if(this.data.player_b[index] == this.data.num1+1)
                {
                  let temp_list = this.data.player_b;
                  temp_list[index] = 0;
                  let temp_box = "box_" + `${index+10}`;
                  if(temp_box == "box_10"){
                    this.setData({player_b:temp_list, box_10:"none",['incident.box_10'] : "locationClick"});
                  }else if(temp_box == "box_13"){
                    this.setData({player_b:temp_list, box_13:"none",['incident.box_13'] : "locationClick"});
                  }else if(temp_box == "box_16"){
                    this.setData({player_b:temp_list, box_16:"none",['incident.box_16'] : "locationClick"});
                  }
                }
            }
            this.compute_score_b(this.data.player_b)
            this.compute_score_a(this.data.player_a)
            this.gameover();
            break;
            case "box_8":
            this.setData(
              {['incident.box_8'] : 0,['showdata.box_8'] : this.data.num1,box_8 : "true",['resp.wrap']:"none",
            'player_a[7]':this.data.num1+1,'boxs[7]':0}
            );
                         // 消除玩家B的骰子，并计算出B被消除后的分数
                         var position = "box_8".slice(4)-1;
                         position = position % 3;
                         for(var index=position; index<9; index+=3){
                             if(this.data.player_b[index] == this.data.num1+1)
                             {
                               let temp_list = this.data.player_b;
                               temp_list[index] = 0;
                               let temp_box = "box_" + `${index+10}`;
                               if(temp_box == "box_11"){
                                 this.setData({player_b:temp_list, box_11:"none",['incident.box_11'] : "locationClick"});
                               }else if(temp_box == "box_14"){
                                 this.setData({player_b:temp_list, box_14:"none",['incident.box_14'] : "locationClick"});
                               }else if(temp_box == "box_17"){
                                 this.setData({player_b:temp_list, box_17:"none",['incident.box_17'] : "locationClick"});
                               }
                             }
                         }
                         this.compute_score_b(this.data.player_b)
            this.compute_score_a(this.data.player_a)
            this.gameover();
            break;
            case "box_9":
            this.setData(
              {['incident.box_9'] : 0,['showdata.box_9'] : this.data.num1,box_9 : "true",['resp.wrap']:"none",'player_a[8]':this.data.num1+1,'boxs[8]':0}
            );
            var position = "box_9".slice(4)-1;
            position = position % 3;
            for(var index=position; index<9; index+=3){
                if(this.data.player_b[index] == this.data.num1+1)
                {
                  let temp_list = this.data.player_b;
                  temp_list[index] = 0;
                  let temp_box = "box_" + `${index+10}`;
                  if(temp_box == "box_12"){
                    this.setData({player_b:temp_list, box_12:"none",['incident.box_12'] : "locationClick"});
                  }else if(temp_box == "box_15"){
                    this.setData({player_b:temp_list, box_15:"none",['incident.box_15'] : "locationClick"});
                  }else if(temp_box == "box_18"){
                    this.setData({player_b:temp_list, box_18:"none",['incident.box_18'] : "locationClick"});
                  }
                }
            }
            this.compute_score_b(this.data.player_b)
            this.compute_score_a(this.data.player_a)
            break;
            case "box_10":
              this.setData(
                {['incident.box_10'] : 0,['showdata.box_10'] : this.data.num1,box_10 : "true",['resp.wrap_1']:"none",'player_b[0]':this.data.num1+1}
              );
              var position = "box_10".slice(4,6)-10;
              position = position % 3;
              for(var index=position; index<9; index+=3){
                  if(this.data.player_a[index] == this.data.num1+1)
                  {
                    let temp_list = this.data.player_a;
                    temp_list[index] = 0;
                    let temp_box = "box_" + `${index+1}`;
                    if(temp_box == "box_1"){
                      this.setData({player_a:temp_list, box_1:"none",['incident.box_1'] : "locationClick",'boxs[0]':1});
                    }else if(temp_box == "box_4"){
                      this.setData({player_a:temp_list, box_4:"none",['incident.box_4'] : "locationClick",'boxs[3]':4});
                    }else if(temp_box == "box_7"){
                      this.setData({player_a:temp_list, box_7:"none",['incident.box_7'] : "locationClick",'boxs[6]':7});
                    }
                  }
              }
              this.compute_score_b(this.data.player_b)
            this.compute_score_a(this.data.player_a)
            this.gameover();
            this.locationClick();
              break;
            case "box_11":
            this.setData(
              {['incident.box_11'] : 0,['showdata.box_11'] : this.data.num1,box_11 : "true",['resp.wrap_1']:"none",'player_b[1]':this.data.num1+1}
            );
            var position = "box_11".slice(4,6)-10;
            position = position % 3;
            for(var index=position; index<9; index+=3){
                if(this.data.player_a[index] == this.data.num1+1)
                {
                  let temp_list = this.data.player_a;
                  temp_list[index] = 0;
                  let temp_box = "box_" + `${index+1}`;
                  if(temp_box == "box_2"){
                    this.setData({player_a:temp_list, box_2:"none",['incident.box_2'] : "locationClick",'boxs[1]':2});
                  }else if(temp_box == "box_5"){
                    this.setData({player_a:temp_list, box_5:"none",['incident.box_5'] : "locationClick",'boxs[4]':5});
                  }else if(temp_box == "box_8"){
                    this.setData({player_a:temp_list, box_8:"none",['incident.box_8'] : "locationClick",'boxs[7]':8});
                  }
                }
            }
            this.compute_score_b(this.data.player_b)
            this.compute_score_a(this.data.player_a)
            this.gameover();
            this.locationClick();
            break;
            case "box_12":
            this.setData(
              {['incident.box_12'] : 0,['showdata.box_12'] : this.data.num1,box_12 : "true",['resp.wrap_1']:"none",'player_b[2]':this.data.num1+1}
            );
            var position = "box_12".slice(4,6)-10;
            position = position % 3;
            for(var index=position; index<9; index+=3){
                if(this.data.player_a[index] == this.data.num1+1)
                {
                  let temp_list = this.data.player_a;
                  temp_list[index] = 0;
                  let temp_box = "box_" + `${index+1}`;
                  if(temp_box == "box_3"){
                    this.setData({player_a:temp_list, box_3:"none",['incident.box_3'] : "locationClick",'boxs[2]':3});
                  }else if(temp_box == "box_6"){
                    this.setData({player_a:temp_list, box_6:"none",['incident.box_6'] : "locationClick",'boxs[5]':6});
                  }else if(temp_box == "box_9"){
                    this.setData({player_a:temp_list, box_9:"none",['incident.box_9'] : "locationClick",'boxs[8]':9});
                  }
                }
            }
            this.compute_score_b(this.data.player_b)
          this.compute_score_a(this.data.player_a)
          this.gameover();
          this.locationClick();
            break;
            case "box_13":
            this.setData(
              {['incident.box_13'] : 0,['showdata.box_13'] : this.data.num1,box_13 : "true",['resp.wrap_1']:"none",'player_b[3]':this.data.num1+1}
            );
            var position = "box_13".slice(4,6)-10;
            position = position % 3;
            for(var index=position; index<9; index+=3){
                if(this.data.player_a[index] == this.data.num1+1)
                {
                  let temp_list = this.data.player_a;
                  temp_list[index] = 0;
                  let temp_box = "box_" + `${index+1}`;
                  if(temp_box == "box_1"){
                    this.setData({player_a:temp_list, box_1:"none",['incident.box_1'] : "locationClick",'boxs[0]':1});
                  }else if(temp_box == "box_4"){
                    this.setData({player_a:temp_list, box_4:"none",['incident.box_4'] : "locationClick",'boxs[3]':4});
                  }else if(temp_box == "box_7"){
                    this.setData({player_a:temp_list, box_7:"none",['incident.box_7'] : "locationClick",'boxs[6]':7});
                  }
                }
            }
            this.compute_score_b(this.data.player_b)
          this.compute_score_a(this.data.player_a)
          this.gameover();
          this.locationClick();
            break;
            case "box_14":
            this.setData(
              {['incident.box_14'] : 0,['showdata.box_14'] : this.data.num1,box_14 : "true",['resp.wrap_1']:"none",'player_b[4]':this.data.num1+1}
            );
            var position = "box_14".slice(4,6)-10;
            position = position % 3;
            for(var index=position; index<9; index+=3){
                if(this.data.player_a[index] == this.data.num1+1)
                {
                  let temp_list = this.data.player_a;
                  temp_list[index] = 0;
                  let temp_box = "box_" + `${index+1}`;
                  if(temp_box == "box_2"){
                    this.setData({player_a:temp_list, box_2:"none",['incident.box_2'] : "locationClick",'boxs[1]':2});
                  }else if(temp_box == "box_5"){
                    this.setData({player_a:temp_list, box_5:"none",['incident.box_5'] : "locationClick",'boxs[4]':5});
                  }else if(temp_box == "box_8"){
                    this.setData({player_a:temp_list, box_8:"none",['incident.box_8'] : "locationClick",'boxs[7]':8});
                  }
                }
            }
            this.compute_score_b(this.data.player_b)
          this.compute_score_a(this.data.player_a)
          this.gameover();
          this.locationClick();
            break;
            case "box_15":
            this.setData(
              {['incident.box_15'] : 0,['showdata.box_15'] : this.data.num1,box_15 : "true",['resp.wrap_1']:"none",'player_b[5]':this.data.num1+1}
            );
            var position = "box_15".slice(4,6)-10;
            position = position % 3;
            for(var index=position; index<9; index+=3){
                if(this.data.player_a[index] == this.data.num1+1)
                {
                  let temp_list = this.data.player_a;
                  temp_list[index] = 0;
                  let temp_box = "box_" + `${index+1}`;
                  if(temp_box == "box_3"){
                    this.setData({player_a:temp_list, box_3:"none",['incident.box_3'] : "locationClick",'boxs[2]':3});
                  }else if(temp_box == "box_6"){
                    this.setData({player_a:temp_list, box_6:"none",['incident.box_6'] : "locationClick",'boxs[5]':6});
                  }else if(temp_box == "box_9"){
                    this.setData({player_a:temp_list, box_9:"none",['incident.box_9'] : "locationClick",'boxs[8]':9});
                  }
                }
            }
            this.compute_score_b(this.data.player_b)
            this.compute_score_a(this.data.player_a)
            this.gameover();
            this.locationClick();
            break;
            case "box_16":
            this.setData(
              {['incident.box_16'] : 0,['showdata.box_16'] : this.data.num1,box_16 : "true",['resp.wrap_1']:"none",'player_b[6]':this.data.num1+1}
            );
            var position = "box_16".slice(4,6)-10;
            position = position % 3;
            for(var index=position; index<9; index+=3){
                if(this.data.player_a[index] == this.data.num1+1)
                {
                  let temp_list = this.data.player_a;
                  temp_list[index] = 0;
                  let temp_box = "box_" + `${index+1}`;
                  if(temp_box == "box_1"){
                    this.setData({player_a:temp_list, box_1:"none",['incident.box_1'] : "locationClick",'boxs[0]':1});
                  }else if(temp_box == "box_4"){
                    this.setData({player_a:temp_list, box_4:"none",['incident.box_4'] : "locationClick",'boxs[3]':4});
                  }else if(temp_box == "box_7"){
                    this.setData({player_a:temp_list, box_7:"none",['incident.box_7'] : "locationClick",'boxs[6]':7});
                  }
                }
            }
            this.compute_score_b(this.data.player_b)
            this.compute_score_a(this.data.player_a)
            this.gameover();
            this.locationClick();
            break;
            case "box_17":
            this.setData(
              {['incident.box_17'] : 0,['showdata.box_17'] : this.data.num1,box_17 : "true",['resp.wrap_1']:"none",'player_b[7]':this.data.num1+1}
            );
            var position = "box_17".slice(4,6)-10;
            position = position % 3;
            for(var index=position; index<9; index+=3){
                if(this.data.player_a[index] == this.data.num1+1)
                {
                  let temp_list = this.data.player_a;
                  temp_list[index] = 0;
                  let temp_box = "box_" + `${index+1}`;
                  if(temp_box == "box_2"){
                    this.setData({player_a:temp_list, box_2:"none",['incident.box_2'] : "locationClick",'boxs[1]':1});
                  }else if(temp_box == "box_5"){
                    this.setData({player_a:temp_list, box_5:"none",['incident.box_5'] : "locationClick",'boxs[4]':4});
                  }else if(temp_box == "box_8"){
                    this.setData({player_a:temp_list, box_8:"none",['incident.box_8'] : "locationClick",'boxs[7]':8});
                  }
                }
            }
            this.compute_score_b(this.data.player_b)
          this.compute_score_a(this.data.player_a)
          this.gameover();
          this.locationClick();
            break;
            case "box_18":
            this.setData(
              {['incident.box_18'] : 0,['showdata.box_18'] : this.data.num1,box_18 : "true",['resp.wrap_1']:"none",'player_b[8]':this.data.num1+1}
            );
            var position = "box_18".slice(4,6)-10;
            position = position % 3;
            for(var index=position; index<9; index+=3){
                if(this.data.player_a[index] == this.data.num1+1)
                {
                  let temp_list = this.data.player_a;
                  temp_list[index] = 0;
                  let temp_box = "box_" + `${index+1}`;
                  if(temp_box == "box_3"){
                    this.setData({player_a:temp_list, box_3:"none",['incident.box_3'] : "locationClick",'boxs[2]':2});
                  }else if(temp_box == "box_6"){
                    this.setData({player_a:temp_list, box_6:"none",['incident.box_6'] : "locationClick",'boxs[5]':6});
                  }else if(temp_box == "box_9"){
                    this.setData({player_a:temp_list, box_9:"none",['incident.box_9'] : "locationClick",'boxs[8]':9});
                  }
                }
            }
            this.compute_score_b(this.data.player_b)
          this.compute_score_a(this.data.player_a)
          this.gameover();
          this.locationClick();
            break;
          default:
              break;
      };
    },
    compute_score_b:function(score){
      var dict_b_1={"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0};
      for(var i=0; i<9; i+=3){
        for(var dict in dict_b_1){
          if(Number(dict) == this.data.player_b[i]){
            dict_b_1[dict] += 1;
            break;
          }
        }
      }
      var temp_score_b_1 = 0;
      for(var dict in dict_b_1){
        temp_score_b_1 = temp_score_b_1 + (Number(dict)*Math.pow(dict_b_1[dict],2));
      }


      var dict_b_2={"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0};
      for(var i=1; i<9; i+=3){
        for(var dict in dict_b_2){
          if(Number(dict) == this.data.player_b[i]){
            dict_b_2[dict] += 1;
            break;
          }
        }
      }
      var temp_score_b_2 = 0;
      for(var dict in dict_b_2){
        temp_score_b_2 = temp_score_b_2 + (Number(dict)*Math.pow(dict_b_2[dict],2));
      }

      var dict_b_3={"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0};
      for(var i=2; i<9; i+=3){
        for(var dict in dict_b_3){
          if(Number(dict) == this.data.player_b[i]){
            dict_b_3[dict] += 1;
            break;
          }
        }
      }
      var temp_score_b_3= 0;
      for(var dict in dict_b_3){
        temp_score_b_3 = temp_score_b_3 + (Number(dict)*Math.pow(dict_b_3[dict],2));
      }
      this.setData({score_b:temp_score_b_1+temp_score_b_2+temp_score_b_3});
    },
    compute_score_a:function(score){
      var dict_a_1={"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0};
      for(var i=0; i<9; i+=3){
        for(var dict in dict_a_1){
          if(Number(dict) == this.data.player_a[i]){
            dict_a_1[dict] += 1;
            break;
          }
        }
      }
      var temp_score_a_1 = 0;
      for(var dict in dict_a_1){
        temp_score_a_1 = temp_score_a_1 + (Number(dict)*Math.pow(dict_a_1[dict],2));
      }


      var dict_a_2={"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0};
      for(var i=1; i<9; i+=3){
        for(var dict in dict_a_2){
          if(Number(dict) == this.data.player_a[i]){
            dict_a_2[dict] += 1;
            break;
          }
        }
      }
      var temp_score_a_2 = 0;
      for(var dict in dict_a_2){
        temp_score_a_2 = temp_score_a_2 + (Number(dict)*Math.pow(dict_a_2[dict],2));
      }

      var dict_a_3={"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0};
      for(var i=2; i<9; i+=3){
        for(var dict in dict_a_3){
          if(Number(dict) == this.data.player_a[i]){
            dict_a_3[dict] += 1;
            break;
          }
        }
      }
      var temp_score_a_3= 0;
      for(var dict in dict_a_3){
        temp_score_a_3 = temp_score_a_3 + (Number(dict)*Math.pow(dict_a_3[dict],2));
      }
      this.setData({score_a:temp_score_a_1+temp_score_a_2+temp_score_a_3});
    },
    gameover:function(){
      var over_a = 1;
      for(var index=0;index<9;index++){
        if(this.data.player_a[index] == 0){
          over_a = over_a - 1;
          break;
        }
      }
      if(over_a){
        this.setData({show:true})
        if(this.data.score_a > this.data.score_b){
          this.setData({winner:"Robot"})
        }else{
          this.setData({winner:"玩家B"})
        }
      }
      var over_b = 1;
      for(var index=0;index<9;index++){
        if(this.data.player_b[index] == 0){
          over_b = over_b - 1;
          break;
        }
      }
      if(over_b){
        this.setData({show:true})
        if(this.data.score_a > this.data.score_b){
          this.setData({winner:"Robot"})
        }else{
          this.setData({winner:"玩家B"})
        }
      }
    },
    one_more_round:function(){
      wx.redirectTo({
        url: '/pages/index/p_vs_p/twopeple',
      })
    },
    return_sel:function(){
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  })