'use client'
import { Button } from '@nextui-org/button'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table'

export type TUser = {
  email: string
  id: string
}
type TUsersProps = {
  users: TUser[]
  handleDeleteUser: (id: string) => void
}

const Users = ({
  className = '',
  users = [],
  handleDeleteUser,
}: TUsersProps & { className?: string }) => {
  return (
    <Table className={`${className}`} aria-label="User List">
      <TableHeader>
        <TableColumn>Email</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="text-slate-700">{user.email}</TableCell>
            <TableCell>
              <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Users
