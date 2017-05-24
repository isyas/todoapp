(function() {

  var model = Model;
  // ローカルストレージからデータ取得
  var todos = model.getData();
  if (!todos) {
    todos = [];
  }

  // DOMの読み込み完了
  document.addEventListener('DOMContentLoaded', function() {
    setData();
    allTaskShowHide();
    modalShowHide();
    // 読み込み時表示
    render();
    allTaskNum();
  }, false);

  var addTaskBtn = document.getElementById('add-task-btn');
  var taskText = document.getElementById('task-text');
  var mainContetns = document.getElementById('main-contents');

  var setData = function() {
    addTaskBtn.addEventListener('click', function() {
      var txt = taskText.value;

      // 値が空でボタンが押されたら何もしない
      if (!txt) {
        return;
      };

      // 初めてデータを設定する場合
      if (todos === null) {
        var list = [txt];
        console.log(typeof list);
        model.saveData(list);
      }
      // すでにローカルストレージにデータがある場合
      else {
        todos.push({
          text: txt,
          done: false
        });
        model.saveData(todos);
      }

      // タスクの書き出し
      render();

      // テキストボックスのクリア
      taskText.value = '';

      // モーダル閉じる
      var addTaskModal = document.getElementById('add-task-modal');
      var modalBg = document.getElementsByClassName('modal-bg');
      addTaskModal.classList.add('hide');
      modalBg[0].classList.add('hide');
    }, false);

  };

  // タスクの書き出し
  var render = function() {
    mainContetns.innerHTML = '';
    todos.forEach(function(todo) {

      // フラグ設定
      var index = todos.indexOf(todo);
      console.log(index);

      // task-cell上段
      var taskCellBox = document.createElement('ul');
      taskCellBox.classList.add('task-cell', 'task-tag');

      var taskCheck = document.createElement('li');
      taskCheck.classList.add('task-check');

      var taskName = document.createElement('li');
      taskName.classList.add('task-name');
      taskName.textContent = todo.text;

      var taskDate = document.createElement('li');
      taskDate.classList.add('task-date');
      // taskDate.textContent = '５日前'

      var idNum = index + 1;
      var checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.id = 'task-check-' + idNum;
      console.log(checkBox.id);

      // タスク完了ボタンの表示非表示
      checkBox.addEventListener('change', function(event) {
        var checkId = (event.target.id).substr(11);
        var targetCell = document.getElementById('task-finish-' + checkId);
        if (event.target.checked) {
          targetCell.classList.remove('hide');
        } else {
          targetCell.classList.add('hide');
        }
      });

      taskCheck.appendChild(checkBox);
      taskCellBox.appendChild(taskCheck);
      taskCellBox.appendChild(taskName);
      taskCellBox.appendChild(taskDate);

      // task-cell 下段
      var taskFinish = document.createElement('ul');
      taskFinish.classList.add('task-cell', 'task-tag', 'hide');
      taskFinish.id = 'task-finish-' + idNum;

      var taskDone = document.createElement('li');
      taskDone.classList.add('task-done');

      var cancelBtn = document.createElement('button');
      cancelBtn.classList.add('cancel-btn');
      cancelBtn.textContent = 'キャンセル';
      cancelBtn.addEventListener('click', function(){
        this.parentNode.parentNode.classList.add('hide');
        checkBox.checked = false;
      });

      var doneBtn = document.createElement('button');
      doneBtn.classList.add('done-btn');
      doneBtn.textContent = 'タスク完了';
      doneBtn.addEventListener('click', function(){
        var todoList = this.closest('#todo-list');
        todoList.parentNode.removeChild(todoList);
        console.log(index);
        todos.splice(index,1);
        model.saveData(todos);// データベースに保存
        render();
      });

      taskDone.appendChild(cancelBtn);
      taskDone.appendChild(doneBtn);
      taskFinish.appendChild(taskDone);

      var todoList = document.createElement('div');
      todoList.id = 'todo-list';
      todoList.classList.add('task-cell-bb');

      todoList.appendChild(taskCellBox);
      todoList.appendChild(taskFinish);

      mainContetns.appendChild(todoList);
    });

    allTaskNum();
  }
  //完了したタスクの表示
  var allTaskNum = function() {
    var index = todos.length;
    var allTaskNum = document.getElementById('all-task-num');
    allTaskNum.textContent = index;
  };

  //全てのタスクの表示非表示
  var allTaskShowHide = function() {
    var allTask = document.getElementById('all-task');
    var allTaskFlame = document.getElementById('all-task-flame');
    var goToIndex = document.getElementById('go-to-index');

    allTask.addEventListener('click', function() {
      allTaskFlame.classList.add('show-flame');
    }, false);

    goToIndex.addEventListener('click', function() {
      allTaskFlame.classList.remove('show-flame');
    }, false);

  };

  // モーダル立ち上げ
  var modalShowHide = function() {
    var addBtn = document.getElementById('add-btn');
    var addTaskModal = document.getElementById('add-task-modal');
    var modalBg = document.getElementsByClassName('modal-bg');
    var closeBtn = document.getElementById('close-btn');

    addBtn.addEventListener('click', function() {
      addTaskModal.classList.remove('hide');
      modalBg[0].classList.remove('hide');
    }, false);

    modalBg[0].addEventListener('click', function() {
      if (this.classList.contains('hide')) {
        return;
      } else {
        addTaskModal.classList.add('hide');
        modalBg[0].classList.add('hide');
      }
    }, false);

    closeBtn.addEventListener('click', function() {
      addTaskModal.classList.add('hide');
      modalBg[0].classList.add('hide');
    }, false);
  };

})();
