オブジェクトに簡単にイベントを追加できるライブラリ。
使い方はjQueryなどのものと同様、bind/unbindでイベント追加、triggerで発火します。

またイベントを追加したいオブジェクトに対して以下のようにするだけで簡単に追加できます。

**attach
<pre>
var targetObj = {};
EvtEmit.attach(targetObj);
</pre>

**bind
<pre>
targetObj.bind('update', function (data) {
        alert('update!');
});
</pre>

**trigger
<pre>
targetObj.trigger('update', data);
</pre>
