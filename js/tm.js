    
        window.onload = function() {
            var swiper = new Swiper('.swiper-container', {
                pagination : '.swiper-pagination',
                paginationClickable :true,
                effect: 'slide',
                grabCursor: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                autoplay: 3000,
                autoplayDisableOnInteraction: false,
                loop:true,
                speed:1000

            })
        }

    
    //banner控制
//    $(function(){
//        $('.carousel').carousel();
//    })
    //Anjular.js
    var app=angular.module('myapp',[]);
    

    function getScroll(e){
            var e = e || window.event;
            var oScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

            var oScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            return {
                x: e.clientX + oScrollLeft,
                y: e.clientY + oScrollTop
            };
    }
    
    app.controller('goodsCtrl',function($scope,$http){
        $scope.goods=[
            {"gid":'001',"name":'Micro-USB至Type-C转换接头',"des":'即插即用，全面兼容',"price":10,"url":'images/g1.jpg'},
            {"gid":"002","name":"全场景无线降噪耳机","des":"高清无损本地存储播放","price":900,"url":"images/g2.jpg"},
            {"gid":"003","name":"《深泽直人》","des":"首次向中国读者介绍其作品","price":30,"url":"images/g3.jpg"},
            {"gid":"004","name":"Misfit Shine","des":"自动睡眠追踪、模拟来电","price":699,"url":"images/g4.jpg"},
            {"gid":"005","name":"JBL FLIP3蓝牙便携音箱","des":"全新防水功能、体积小巧","price":999,"url":"images/g5.jpg"},
            {"gid":"006","name":"Type-C 数据线 1m","des":"3A大电流充电、夜间微光灯","price":15,"url":"images/g6.jpg"},
            {"gid":"007","name":"Smartisan 原装快充充电器","des":"24W急速快充","price":30,"url":"images/g7.jpg"},
            {"gid":"008","name":"JBL入耳式线控耳机","des":"低音澎湃震撼","price":199,"url":"images/g8.jpg"}
        ];
        
        $scope.cart={

        };
        

        
        //商品加入购物车
        $scope.buy=function(good,e){
            var g=angular.copy(good);
            if($scope.cart[g.gid]){
                $scope.cart[g.gid].num+=1;
            }else{
                g.num=1;
                $scope.cart[g.gid]=g;
            }
            
                    //                抛物线加入购物车
            var x = getScroll(e).x;
            var y = getScroll(e).y;
            var screenW=document.documentElement.clientWidth;
            $('<div id="fly"><img src="' + good.url + '"width="30" height="30"</div>').fly({
                start: {
                    left: e.clientX - 50,
                    top: e.clientY - 50,
                },
                end: {
                    left:screenW-160,
                    top: -30,

                },
                speed: 1.3,
                vertex_Rtop: 100,
                onEnd: function () {
                    $('#fly').fadeOut('normal', function () {
                        $(this).remove();
                        $scope.flag=true;
                    })
                }
            }) 
        }
        
        //购物车商品删除的控制
        $scope.del=function(gid){

                delete $scope.cart[gid];
           
        }
        
        //购物车商品个数加减的控制
        $scope.jia=function(index){
            $scope.cart[index].num+=1;
        }
        $scope.jian=function(index){
            if($scope.cart[index].num>0){
                $scope.cart[index].num-=1;
            }
        }
        
        //监听购物车的变化，更新总计
        $scope.$watch('cart',function(){
				var total = 0;
				var number = 0;
				angular.forEach($scope.cart,function(v,k){
					if(v.ischeck)
					total += v.price*v.num;
					number+=parseInt(v.num);
					
				});
				$scope.total = total;
				$scope.number = number;
        },true)
        
//        var isopen=true;
//        $scope.sort=function(str){
//           $scope.good=$filter("orderBy")($scope.good,str,isopen);
//           isopen=!isopen;
//           console.log(isopen);
//        };
        
        //点击加载更多
        
        $scope.downL=function(){
            $http.get('./1.php').success(function(res){
                $scope.goods=$scope.goods.concat(res);
            });
        }
        
        //点击排序
        var mS=true;
        var shunxu=document.getElementById('shunxu');
        $scope.up=function(){
            if(mS){
                $scope.msg = 'price';
                shunxu.innerText='降序';
                mS=false;
            }else{
                $scope.msg='-price';
                shunxu.innerText='升序';
                mS=true;
            }
            
        }
    })