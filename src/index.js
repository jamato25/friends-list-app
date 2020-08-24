const init =  () =>{
  render();
  addListeners();
}

const render = async() =>{
  const response = await axios.get('/api/friends')
  const friends = response.data;
  const ul = document.getElementById('friendList');
  friends.sort(compare);
  const html = friends.map(friend => {
    return `
    <li > ${friend.name}
      <div> rating: ${friend.rating}
      <button type="button" class = 'plus' data-id = ${friend.id}> + </button>
      <button type="button" class = 'minus' data-id = ${friend.id}> - </button>
      <button type="button" class = 'delete' data-id = ${friend.id}> x </button>
      </div>
    </li>
    `
  }).join('')
  ul.innerHTML = html;
}

const addListeners = async() =>{
  const response = await axios.get('/api/friends')
  const friends = response.data;
  const ul = document.getElementById('friendList');
  const form = document.getElementById('input');

  ul.addEventListener('click', async (ev)=>{
    const id = ev.target.getAttribute('data-id')
    let selectedFriend;
    for (let friend of friends){
      if(friend.id === parseInt(id)) {
        selectedFriend = friend
      }
    }

    if(ev.target.className === 'plus'){
      selectedFriend.rating++;
      await axios.put(`/api/friends/${id}`, {rating: selectedFriend.rating})
      render()
    }
    if(ev.target.className === 'minus'){
      selectedFriend.rating--;
      await axios.put(`/api/friends/${id}`, {rating: selectedFriend.rating})
      render()
    }
    if(ev.target.className === 'delete'){
      await axios.delete(`/api/friends/${id}`)
      render()
    }
  })

  form.addEventListener('submit', async (ev) =>{
    ev.preventDefault()
    await axios.post('/api/friends')


    render()
  })
}

function compare(a,b){
  let comparison = 0;
  if(a.rating<b.rating){comparison = 1}
  else if(a.rating>b.rating){comparison = -1}
  return comparison;
}

init();
