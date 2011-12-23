オブジェクトに簡単にイベントを追加できるライブラリです。<br />
使い方はjQueryなどのものと同様、bind/unbind(on/off)でイベント追加、triggerで発火します。

またイベントを追加したいオブジェクトに対して以下のようにするだけで簡単に追加できます。  
(コンテキストを渡すことで、実行時のコンテキストを変更することもできます)

*attach*
<pre>
var targetObj = {};
EvtEmit.attach(targetObj);
</pre>

*bind*
<pre>
targetObj.bind('update', function (data) {
        alert('update!');
});
</pre>

*コンテキストの変更*
<pre>
targetObj.bind('update', this.method, this);
</pre>

*on (エイリアス)*
<pre>
targetObj.on('update', function (data) {
        alert('update!');
});
</pre>

*trigger*
<pre>
targetObj.trigger('update', data);
</pre>

*off (エイリアス)*
<pre>
targetObj.off('update', data);
</pre>
