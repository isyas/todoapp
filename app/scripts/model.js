var Model = (function(){
    // Private変数
    var KEY = 'data';

    // Publicメソッド
    var publicObj = {
        // ローカルストレージにデータを保存
        saveData: function(data){
            // 配列をJSON文字列に変換
            var json = JSON.stringify(data);
            // 保存
            console.log(json);
            localStorage.setItem(KEY, json);
        },

        // ローカルストレージからデータを取得
        getData: function(){
            // 取得
            var json = localStorage.getItem(KEY);
            console.log(json);
            // まだローカルストレージにデータが無い場合はは null を返す
            if(json === null){
                return null;
            }

            // データがある場合はJSON文字列を配列に変換して返す
            var obj = JSON.parse(json);
            console.log(obj);
            return obj;
        }
    };

    return publicObj;

})();
