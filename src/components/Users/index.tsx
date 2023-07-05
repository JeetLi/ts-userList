import React, { ChangeEvent, FC, MouseEvent } from "react";
import { Skeleton } from "./Skeleton";
import { User } from "./User";

interface UserListProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface UserProps {
  items: UserListProps[];
  isLoading: boolean;
  searchValue: string;
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  invites: number[];
  onClickInvite: (id: number) => void;
  inClickSendInvites: () => void;
}

export const Users: FC<UserProps> = ({
  items,
  isLoading,
  searchValue,
  onChangeSearchValue,
  invites,
  onClickInvite,
  inClickSendInvites,
}) => {
  console.log(searchValue);
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          value={searchValue}
          onChange={(event) => onChangeSearchValue(event)}
          type="text"
          placeholder="Найти пользователя..."
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {items
            .filter((obj) => {
              const fullName = (
                obj.first_name +
                " " +
                obj.last_name
              ).toLowerCase();

              return fullName.includes(searchValue.toLowerCase());
              // ||
              // obj.email.toLowerCase().includes(searchValue.toLowerCase())
            })
            .map((obj) => {
              return (
                <User
                  onClickInvite={onClickInvite}
                  isInvited={invites.includes(obj.id)}
                  key={obj.id}
                  id={obj.id}
                  email={obj.email}
                  first_name={obj.first_name}
                  last_name={obj.last_name}
                  avatar={obj.avatar}
                />
              );
            })}
        </ul>
      )}
      {invites.length > 0 && (
        <button onClick={inClickSendInvites} className="send-invite-btn">
          Отправить приглашение
        </button>
      )}
    </>
  );
};
