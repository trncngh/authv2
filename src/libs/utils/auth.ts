import bcrypt from 'bcrypt'
export const saltAndHash = async (password: string) => {
  const passwordSalt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, passwordSalt)
  return { passwordSalt, hashedPassword }
}
