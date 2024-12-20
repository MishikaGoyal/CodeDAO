"use client";

import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-semibold text-blue-300 hover:text-blue-100 transition-colors"
        >
          <h1 className="text-2xl font-bold text-blue-400">
            Code <span className="text-white">DAO</span>
          </h1>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/donor"
              className="text-blue-300 hover:text-blue-100 transition-colors"
            >
              Contribution Overview
            </Link>
          </li>
          <li>
            <Link
              href="/open-proposals"
              className="text-blue-300 hover:text-blue-100 transition-colors"
            >
              Open Proposals
            </Link>
          </li>
          <li>
            <Link
              href="/accepted-proposals"
              className="text-blue-300 hover:text-blue-100 transition-colors"
            >
              Accepted Proposals
            </Link>
          </li>
          <li>
            <Link
              href="/donor"
              className="text-white hover:text-white transition-colors"
            >
              🔧 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
