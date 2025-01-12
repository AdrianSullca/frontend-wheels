import { Table, Button, Modal, TextInput } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { User } from "../../types/interfaces";
import { useState } from "react";

interface UserListItemProps {
  user: User;
  onDelete: (userId: string) => void;
  onUpdate: (user: User, newPassword: string) => void;
}

export default function UserListItem({
  user,
  onDelete,
  onUpdate,
}: UserListItemProps) {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [updateUser, setUpdateUser] = useState(user);
  const [newPassword, setNewPassword] = useState("");

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {user.name}
      </Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.phone_number}</Table.Cell>
      <Table.Cell>{user.enabled ? "Yes" : "No"}</Table.Cell>
      <Table.Cell className="flex gap-4 justify-end">
        <button onClick={() => setOpenModalUpdate(true)}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            />
          </svg>
        </button>
        <button onClick={() => setOpenModalDelete(true)}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>
        </button>
      </Table.Cell>

      <Modal
        show={openModalDelete}
        size="md"
        onClose={() => setOpenModalDelete(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure to remove the user {user.name}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  onDelete(String(user.id));
                  setOpenModalDelete(false);
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModalDelete(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal de actualización */}
      <Modal
        show={openModalUpdate}
        size="md"
        onClose={() => setOpenModalUpdate(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Update user information
            </h3>
            <div>
              <label htmlFor="name" className="text-black">
                Name
              </label>
              <TextInput
                id="name"
                placeholder="Name"
                value={updateUser.name}
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, name: e.target.value })
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
                value={updateUser.email}
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, email: e.target.value })
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
                value={updateUser.phone_number}
                onChange={(e) =>
                  setUpdateUser({
                    ...updateUser,
                    phone_number: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="new_password" className="text-black">
                New password
              </label>
              <TextInput
                id="new_password"
                type="password"
                placeholder="New password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={() => {
                  onUpdate(updateUser, newPassword);
                  setOpenModalUpdate(false);
                }}
              >
                Update
              </Button>
              <Button color="gray" onClick={() => setOpenModalUpdate(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Table.Row>
  );
}
