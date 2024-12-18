'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email) {
      setMessage({ type: 'success', text: `Password reset link sent to ${email}` })
    } else {
      setMessage({ type: 'error', text: 'Please enter a valid email address' })
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-8 border border-gray-700">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1F89DB] via-[#F42A8B] to-[#1F89DB]">
                Forgot Password
              </span>
            </h1>
            <p className="text-gray-400">Enter your email to reset your password</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {message && (
                <div className={`flex items-center ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                  {message.type === 'error' ? (
                    <AlertCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                  )}
                  <p className="text-sm">{message.text}</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </div>
          </form>

          <p className="mt-8 text-sm text-center text-gray-400">
            Remember your password?{" "}
            <Link href="/signin" className="font-medium text-blue-400 hover:text-blue-300 transition duration-200">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

