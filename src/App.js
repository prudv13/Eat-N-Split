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

  const handleShowAddFriend = () => {
    setShowAddFriend(show => !show);
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList />
        {showAddFriend && <FormAddFriend />}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? 'Close' : 'Add friend'}</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

export default App;

const FriendsList = () => {

  const friends = initialFriends;

  return (
    <Fragment>
      <ul>
      {friends.map(friend => <Friend friend={friend} key={friend.id} />)}
      </ul>
    </Fragment>
  )
}

const Friend = ({friend}) => {
  return (
    <Fragment>
      <li>
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

        <Button>Select</Button>
      </li>
    </Fragment>
  )
};

const Button = ({children, onClick}) => {
  return (
    <button onClick={onClick} className='button'>{children}</button>
  );
}

const FormAddFriend = () => {
  return (
    <form className='form-add-friend'>
      <label>👫Friendname</label>
      <input type='text' />

      <label>🌇 Image URL</label>
      <input type='text' />

      <Button>Add</Button>
    </form>
  )
}

const FormSplitBill = () => {
  return (
    <form className='form-split-bill'>
      <h2>Split a bill with X</h2>

      <label>💰 Bill value</label>
      <input type='text' />

      <label>🕴️Your expense</label>
      <input type='text' />

      <label>👫 X's expense</label>
      <input type='text' disabled />

      <label>🤑 who is paying the bill</label>
      <select>
        <option value='user'>You</option>
        <option value='friend'>X</option>
      </select>

      <Button>Add</Button>
    </form>
  );
}