import React, { useEffect, useState, FC, ChangeEvent, MouseEvent } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";
import axios from "axios";

interface UserProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface AppProps {
  isLoading: boolean;
  searchValue: string;
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  invites: number[];
  onClickInvite: (id: number) => void;
  onClickSendInvites: () => void;
}

const App: FC = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [invites, setInvites] = useState<number[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении пользователей");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id: number) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          inClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
};

export default App;
