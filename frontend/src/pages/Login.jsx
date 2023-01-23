import React, { useState } from "react"
import LogForm from "../layout/LogForm"

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div>
      <LogForm isLogin={isLogin} />
    </div>
  )
}

export default Login
