import { useState } from 'react';
import './App.css';
import FriendsList from './components/FriendsList';
import FormAddFriend from './components/FormAddFriend';
import Button from './components/Button';
import FormSplitBill from './components/FormSplitBill';

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

  const handleSplitBill = (value) => {
    setFriends(friends => friends.map(
      friend => friend.id === selectedFriend.id ? 
      {...friend, balance: friend.balance + value}
      : friend
    ));

    setSelectedFriend(null);
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

      {selectedFriend &&<FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} /> }
    </div>
  );
}

export default App;