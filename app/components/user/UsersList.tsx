import { useLoaderData, useFetcher } from "@remix-run/react";
import UserListItem from "./UserListItem";
import { User } from "../../types/interfaces";
import { Table, Modal, Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

export default function UsersList() {
  const { users } = useLoaderData<{ users: User[] }>();
  const deleteFetcher = useFetcher();
  const updateFetcher = useFetcher();
  const createFetcher = useFetcher();

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const handleMessage = (newMessage: string, type: "success" | "error") => {
    setMessage(newMessage);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  const handleDelete = (userId: string) => {
    deleteFetcher.submit(
      { userId },
      { method: "DELETE", action: "/manage/users" }
    );
  };

  const handleUpdate = (user: User, newPassword: string) => {
    updateFetcher.submit(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        new_password: newPassword,
        enabled: user.enabled,
      },
      { method: "PATCH", action: "/manage/users" }
    );
  };

  const handleCreate = () => {
    createFetcher.submit(newUser, { method: "POST", action: "/manage/users" });
    setOpenModalCreate(false);
  };

  useEffect(() => {
    if (deleteFetcher.state === "idle" && deleteFetcher.data) {
      const data = deleteFetcher.data as { success: boolean; message: string };
      const { success, message } = data;
      if (success) {
        handleMessage(message, "success");
      } else {
        handleMessage("Failed to delete user", "error");
      }
    }
  }, [deleteFetcher.state, deleteFetcher.data]);

  useEffect(() => {
    if (updateFetcher.state === "idle" && updateFetcher.data) {
      const data = updateFetcher.data as { success: boolean; message: string };
      const { success, message } = data;
      if (success) {
        handleMessage(message, "success");
      } else {
        handleMessage("Failed to update user", "error");
      }
    }
  }, [updateFetcher.state, updateFetcher.data]);

  useEffect(() => {
    if (createFetcher.state === "idle" && createFetcher.data) {
      const data = createFetcher.data as { success: boolean; message: string };
      const { success, message } = data;
      if (success) {
        handleMessage(message, "success");
      } else {
        handleMessage("Failed to create user", "error");
      }
    }
  }, [createFetcher.state, createFetcher.data]);

  return (
    <div className="overflow-x-auto">
      {message && (
        <div
          className={`mb-4 p-3 text-center rounded ${
            messageType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone number</Table.HeadCell>
          <Table.HeadCell>Enabled</Table.HeadCell>
          <Table.HeadCell className="text-right">
            <button
              onClick={() => setOpenModalCreate(true)}
              className="text-white bg-custom-gray rounded-lg px-4 py-2 text-xs font-normal"
            >
              Add user
            </button>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user: User) => (
            <UserListItem
              key={user.id}
              user={user}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </Table.Body>
      </Table>
      <Modal
        show={openModalCreate}
        size="md"
        onClose={() => setOpenModalCreate(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Create new user
            </h3>
            <div>
              <label htmlFor="name" className="text-black">
                Name
              </label>
              <TextInput
                id="name"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="email" className="text-black">
                Email
              </label>
              <TextInput
                id="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="phone_number" className="text-black">
                Phone number
              </label>
              <TextInput
                id="phone_number"
                placeholder="Phone number"
                value={newUser.phone_number}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone_number: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="text-black">
                Password
              </label>
              <TextInput
                id="password"
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password_confirmation" className="text-black">
                Confirm Password
              </label>
              <TextInput
                id="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                value={newUser.password_confirmation}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    password_confirmation: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={handleCreate}>
                Create
              </Button>
              <Button color="gray" onClick={() => setOpenModalCreate(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
