import { Fragment } from "react";
import Friend from "./Friend";

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

export default FriendsList;