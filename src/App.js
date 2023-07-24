import { Fragment, useState } from 'react';
import './App.css';

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {

  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriend = () => {
    setShowAddFriend(show => !show);
  }

  const handleAddFriend = (newFriend) => {
    setFriends(friends => [...friends, newFriend]);
    setShowAddFriend(false);
  }

  const handleSelection = (friend) => {
    setSelectedFriend((currentSelected) => (currentSelected?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>{showAddFriend ? 'Close' : 'Add friend'}</Button>
      </div>

      {selectedFriend &&<FormSplitBill selectedFriend={selectedFriend} /> }
    </div>
  );
}

export default App;

const FriendsList = ({friends, onSelection, selectedFriend}) => {

  return (
    <Fragment>
      <ul>
      {friends.map(friend => 
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      )}
      </ul>
    </Fragment>
  )
}

const Friend = ({friend, onSelection, selectedFriend}) => {

  const isSelected = selectedFriend?.id === friend.id;

  return (
    <Fragment>
      <li className={isSelected ? 'selected' : ""}>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>

        {friend.balance < 0 && 
          <p className='red'>You owe {friend.name} {Math.abs(friend.balance)}$</p>
        }

        {friend.balance > 0 && 
          <p className='green'>{friend.name} owes you {Math.abs(friend.balance)}$</p>
        }

        {friend.balance=== 0 && 
          <p>You and {friend.name} are even</p>
        }

        <Button
          onClick={() =>onSelection(friend)}
        >
          {isSelected ? 'Close' : 'Select'}
        </Button>
      </li>
    </Fragment>
  )
};

const Button = ({children, onClick}) => {
  return (
    <button onClick={onClick} className='button'>{children}</button>
  );
}

const FormAddFriend = ({onAddFriend}) => {

  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image : `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName('');
    setImage("https://i/pravatar.cc/48");
  }

  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label>👫Friendname</label>
      <input 
        type='text' 
        value={name} 
        onChange={e=> setName(e.target.value)}
      />

      <label>🌇 Image URL</label>
      <input
        type='text'
        value={image}
        onChange={e=> setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  )
}

const FormSplitBill = ({selectedFriend}) => {

  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  return (
    <form className='form-split-bill'>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input 
        type='text' 
        value={bill} 
        onChange={e => setBill(Number(e.target.value))}
      />

      <label>🕴️Your expense</label>
      <input 
        type='text'
        value={paidByUser}
        onChange={e => setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))}
      />

      <label>👫 {selectedFriend.name}'s expense</label>
      <input
        type='text'
        disabled
        value={paidByFriend}
      />

      <label>🤑 who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={e => setWhoIsPaying(e.target.value)}
      >
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>

      <Button>Add</Button>
    </form>
  );
}