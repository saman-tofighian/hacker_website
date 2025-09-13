"use client"

import type React from "react"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skull, Terminal, Zap, Eye, Network, Shield, Wifi, Lock, Globe, Cpu } from "lucide-react"
import { useFrame } from "@react-three/fiber"

const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => ({ default: mod.Canvas })), {
  ssr: false,
})
const OrbitControls = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.OrbitControls })), {
  ssr: false,
})
const Environment = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.Environment })), {
  ssr: false,
})
const Text = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.Text })), {
  ssr: false,
})

const ThreeJSWrapper = dynamic(
  () => Promise.resolve(({ children }: { children: React.ReactNode }) => <>{children}</>),
  {
    ssr: false,
  },
)

function HorrorPreloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [glitchText, setGlitchText] = useState("")

  const horrorMessages = [
    "INITIALIZING NIGHTMARE PROTOCOL...",
    "ACCESSING FORBIDDEN DATABASES...",
    "BYPASSING REALITY FIREWALL...",
    "DOWNLOADING DIGITAL SOULS...",
    "CORRUPTING SYSTEM FILES...",
    "ESTABLISHING DARK CONNECTION...",
    "WELCOME TO THE ABYSS...",
  ]

  const glitchChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?~`"

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        if (newProgress >= 100) {
          setTimeout(onComplete, 1000)
          return 100
        }
        return newProgress
      })
    }, 200)

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % horrorMessages.length)
    }, 800)

    const glitchInterval = setInterval(() => {
      const chars = Array.from({ length: 20 }, () => glitchChars[Math.floor(Math.random() * glitchChars.length)]).join(
        "",
      )
      setGlitchText(chars)
    }, 100)

    return () => {
      clearInterval(interval)
      clearInterval(messageInterval)
      clearInterval(glitchInterval)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Blood drip effect */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-900 via-red-600 to-red-900 blood-drip"></div>

      {/* Glitch overlay */}
      <div className="absolute inset-0 opacity-20 text-red-500 font-mono text-xs overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            {glitchText}
          </div>
        ))}
      </div>

      <div className="text-center space-y-8">
        {/* Skull ASCII Art */}
        <div className="font-mono text-red-500 text-sm horror-pulse">
          <pre>{`
    ░░░░░░░░░▄▄▄▄▄▄▄▄▄▄▄▄░░░░░░░░░
    ░░░░░░▄▄█▀▀▀▀▀▀▀▀▀▀▀█▄▄░░░░░░
    ░░░░▄█▀░░░░░░░░░░░░░░░▀█▄░░░░
    ░░▄█▀░░░░░░░░░░░░░░░░░░░▀█▄░░
    ░█▀░░░░░░░░░░░░░░░░░░░░░░░▀█░
    █▀░░░░░░░░░░░░░░░░░░░░░░░░░▀█
    █░░░░░░░░░░░░░░░░░░░░░░░░░░░█
    █░░░▄▄░░░░░░░░░░░░░░░▄▄░░░░█
    █░░░▀▀░░░░░░░░░░░░░░░▀▀░░░░█
    █░░░░░░░░░░▄▄▄▄▄░░░░░░░░░░░█
    █░░░░░░░░░█▀▀▀▀▀█░░░░░░░░░░█
    █░░░░░░░░░█░░░░░█░░░░░░░░░░█
    ▀█░░░░░░░░▀▄▄▄▄▄▀░░░░░░░░░█▀
    ░▀█▄░░░░░░░░░░░░░░░░░░░░▄█▀░
    ░░░▀█▄░░░░░░░░░░░░░░░░▄█▀░░░
    ░░░░░▀▀█▄▄▄▄▄▄▄▄▄▄▄▄█▀▀░░░░░
          `}</pre>
        </div>

        {/* Loading message */}
        <div className="text-red-400 text-xl font-mono glitch-text">{horrorMessages[currentMessage]}</div>

        {/* Progress bar */}
        <div className="w-80 mx-auto">
          <div className="bg-red-950 rounded-full h-4 border border-red-800">
            <div
              className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full loading-bar-glow transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-red-300 text-sm mt-2 font-mono">{Math.floor(progress)}% CORRUPTED</div>
        </div>

        {/* Corrupted text */}
        <div className="text-red-600 font-mono text-xs text-corruption">REALITY.EXE HAS STOPPED WORKING...</div>
      </div>
    </div>
  )
}

function MatrixRain() {
  const characters =
    "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン☠†‡∞Ω"

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className={`absolute font-mono text-sm opacity-60 matrix-rain ${
            Math.random() > 0.8 ? "text-red-500" : "text-green-500"
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        >
          {characters.charAt(Math.floor(Math.random() * characters.length))}
        </div>
      ))}
    </div>
  )
}

function SkullModel() {
  const meshRef = useRef<any>()
  const eyeRef1 = useRef<any>()
  const eyeRef2 = useRef<any>()

  useFrame((state: any) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }

    if (eyeRef1.current && eyeRef2.current) {
      const intensity = Math.random() > 0.1 ? Math.sin(state.clock.elapsedTime * 5) * 0.8 + 2 : 0
      eyeRef1.current.intensity = intensity
      eyeRef2.current.intensity = intensity
    }
  })

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[1.2, 2]} />
        <meshStandardMaterial color="#00ff00" wireframe />
      </mesh>

      <mesh position={[-0.4, 0.3, 0.9]}>
        <cylinderGeometry args={[0.2, 0.1, 0.3, 6]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.4, 0.3, 0.9]}>
        <cylinderGeometry args={[0.2, 0.1, 0.3, 6]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      <pointLight ref={eyeRef1} position={[-0.4, 0.3, 1]} color="#ff0000" intensity={3} />
      <pointLight ref={eyeRef2} position={[0.4, 0.3, 1]} color="#ff0000" intensity={3} />

      <Text
        position={[0, -2.5, 0]}
        fontSize={0.25}
        color="#00ff00"
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Regular.ttf"
      >
        SYSTEM COMPROMISED
      </Text>
    </group>
  )
}

function TerminalText() {
  const [text, setText] = useState("")
  const messages = [
    "> INITIATING BREACH PROTOCOL...\n> ACCESSING MAINFRAME...\n> BYPASSING SECURITY...\n> DOWNLOADING FILES...\n> ACCESS GRANTED\n> WELCOME TO THE MATRIX",
    "> SCANNING NETWORK...\n> VULNERABILITIES FOUND...\n> EXPLOITING WEAKNESSES...\n> FIREWALL BYPASSED\n> ADMIN PRIVILEGES OBTAINED",
    "> DECRYPTING DATA...\n> CRACKING PASSWORDS...\n> EXTRACTING INFORMATION...\n> MISSION COMPLETE\n> GHOST PROTOCOL ACTIVATED",
  ]

  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    let i = 0
    const fullText = messages[currentMessage]

    const timer = setInterval(() => {
      setText(fullText.slice(0, i))
      i++
      if (i > fullText.length) {
        clearInterval(timer)
        setTimeout(() => {
          setText("")
          i = 0
          setCurrentMessage((prev) => (prev + 1) % messages.length)
        }, 2000)
      }
    }, 80)

    return () => clearInterval(timer)
  }, [currentMessage])

  return (
    <div className="font-mono text-green-400 text-sm whitespace-pre-line">
      {text}
      <span className="animate-pulse text-green-500">█</span>
    </div>
  )
}

function InteractiveTerminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<
    Array<{ command: string; output: string; type: "success" | "error" | "warning" }>
  >([
    {
      command: "system_init",
      output: "HACKER_NET v1.337 initialized\nWelcome to the digital underground...",
      type: "success",
    },
    { command: "scan_network", output: "Scanning for vulnerabilities... 7 targets found", type: "warning" },
  ])
  const [currentDir, setCurrentDir] = useState("/home/hacker")
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = {
    help: () => ({
      output: `Available commands:
- help: Show this help menu
- ls: List directory contents
- scan: Scan for network vulnerabilities
- hack [target]: Attempt to breach target
- extract: Extract data
- ddos [target]: Launch DDoS attack
- keylog: Start keylogger
- decrypt [file]: Decrypt encrypted files
- backdoor: Install backdoor
- zombie: Create zombie network
- clear: Clear terminal
- whoami: Display current user`,
      type: "success" as const,
    }),

    ls: () => ({
      output: `drwxr-xr-x  2 hacker hacker  4096 Oct 31 23:59 tools/
-rwx------  1 hacker hacker  1337 Oct 31 23:58 exploit.exe
-rwx------  1 hacker hacker  666  Oct 31 23:57 keylogger.dll
-rwx------  1 hacker hacker  2048 Oct 31 23:56 backdoor.bin
-rwx------  1 hacker hacker  13370 Oct 31 23:55 ddos_cannon.py
-rwx------  1 hacker hacker  420  Oct 31 23:54 zombie_maker.sh
drwxr-xr-x  2 hacker hacker  4096 Oct 31 23:55 targets/
drwxr-xr-x  2 hacker hacker  4096 Oct 31 23:53 encrypted/`,
      type: "success" as const,
    }),

    scan: () => ({
      output: `Scanning network for vulnerabilities...
192.168.1.100 - VULNERABLE (Windows 10, unpatched)
192.168.1.101 - PROTECTED (Linux, firewall active)
192.168.1.102 - COMPROMISED (Already breached)
192.168.1.103 - HIGH VALUE TARGET (Banking system)
10.0.0.50 - GOVERNMENT SERVER (Classified)
172.16.0.1 - CORPORATE NETWORK (Weak passwords)

Total targets: 6 | Vulnerable: 4 | Compromised: 1`,
      type: "warning" as const,
    }),

    whoami: () => ({
      output:
        "hacker@darknet:~$ You are the Ghost in the Machine\nUID: 1337 | GID: 1337 | Groups: hackers,elite,anonymous",
      type: "success" as const,
    }),

    clear: () => ({ output: "", type: "success" as const, clear: true }),

    extract: () => ({
      output: `Extracting data...
[████████████████████████████████] 100%
Data extracted: 1,337 files
Sensitive information found: 42 documents
Credit card numbers: 666
Social security numbers: 420
Government secrets: 13
Extraction complete - Files saved to /tmp/stolen/`,
      type: "warning" as const,
    }),

    keylog: () => ({
      output: `Starting keylogger...
[████████████████████████████████] 100%
Keylogger installed successfully
Target: All connected devices
Capturing: Passwords, credit cards, personal data
Log file: /var/log/keystrokes.log
Status: ACTIVE - Recording everything...`,
      type: "error" as const,
    }),

    backdoor: () => ({
      output: `Installing backdoor...
[████████████████████████████████] 100%
Backdoor installed successfully
Port: 31337 (Hidden)
Access: Root privileges granted
Persistence: Enabled
Status: ACTIVE - Remote access available`,
      type: "error" as const,
    }),

    zombie: () => ({
      output: `Creating zombie network...
[████████████████████████████████] 100%
Zombie network established
Infected machines: 13,337
Botnet size: 2.1 TB processing power
Command & Control: ACTIVE
Ready for coordinated attacks...`,
      type: "error" as const,
    }),
  }

  const executeCommand = (cmd: string) => {
    const [command, ...args] = cmd.toLowerCase().trim().split(" ")

    if (command === "clear") {
      setHistory([])
      return
    }

    let result
    if (command in commands) {
      result = (commands as any)[command]()
    } else if (command.startsWith("hack")) {
      const target = args[0] || "unknown"
      result = {
        output: `Attempting to breach ${target}...
[████████████████████████████████] 100%
ACCESS GRANTED
Root privileges obtained
Backdoor installed successfully
Data extraction in progress...
Target compromised - Welcome to the machine`,
        type: "error" as const,
      }
    } else if (command.startsWith("ddos")) {
      const target = args[0] || "unknown"
      result = {
        output: `Launching DDoS attack on ${target}...
Mobilizing botnet: 13,337 zombies
Attack vectors: HTTP flood, SYN flood, UDP flood
[████████████████████████████████] 100%
Target overwhelmed - Server down
Attack successful - ${target} is offline`,
        type: "error" as const,
      }
    } else if (command.startsWith("decrypt")) {
      const file = args[0] || "unknown.enc"
      result = {
        output: `Decrypting ${file}...
Trying brute force attack...
[████████████████████████████████] 100%
Encryption broken: AES-256 cracked
Password found: "password123"
File decrypted successfully
Contents: TOP SECRET GOVERNMENT FILES`,
        type: "warning" as const,
      }
    } else {
      result = {
        output: `Command '${command}' not found. Type 'help' for available commands.`,
        type: "error" as const,
      }
    }

    setHistory((prev) => [...prev, { command: cmd, output: result.output, type: result.type }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      executeCommand(input)
      setInput("")
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  return (
    <Card className="bg-black border-green-800 shadow-2xl shadow-green-900/50">
      <CardHeader className="bg-green-950/30">
        <CardTitle className="text-green-400 flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          INTERACTIVE TERMINAL
        </CardTitle>
        <CardDescription className="text-green-300">Execute commands in the digital underground</CardDescription>
      </CardHeader>
      <CardContent className="bg-black/90 p-0">
        <div
          ref={terminalRef}
          className="h-80 overflow-y-auto p-4 font-mono text-sm scrollbar-thin scrollbar-track-green-950 scrollbar-thumb-green-600"
        >
          {history.map((entry, index) => (
            <div key={index} className="mb-2">
              <div className="text-green-400">
                <span className="text-green-500">hacker@darknet</span>
                <span className="text-green-300">:{currentDir}$</span> {entry.command}
              </div>
              <div
                className={`whitespace-pre-line ${
                  entry.type === "error"
                    ? "text-red-500"
                    : entry.type === "warning"
                      ? "text-yellow-400"
                      : "text-green-200"
                }`}
              >
                {entry.output}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="border-t border-green-900 p-4">
          <div className="flex items-center gap-2">
            <span className="text-green-500 font-mono text-sm">hacker@darknet</span>
            <span className="text-green-300 font-mono text-sm">:{currentDir}$</span>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent border-none text-green-200 font-mono focus:ring-0 focus:outline-none"
              placeholder="Enter command..."
              autoComplete="off"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function NetworkVisualization() {
  const nodesRef = useRef<any[]>([])
  const [connections, setConnections] = useState<Array<{ from: number; to: number }>>([])

  useFrame((state: any) => {
    nodesRef.current.forEach((node, index) => {
      if (node) {
        node.rotation.y += 0.01
        node.position.y = Math.sin(state.clock.elapsedTime + index) * 0.2
      }
    })
  })

  useEffect(() => {
    // Generate random connections between nodes
    const newConnections = []
    for (let i = 0; i < 8; i++) {
      const from = Math.floor(Math.random() * 8)
      const to = Math.floor(Math.random() * 8)
      if (from !== to) {
        newConnections.push({ from, to })
      }
    }
    setConnections(newConnections)
  }, [])

  const nodePositions = [
    [-3, 0, -3],
    [0, 0, -3],
    [3, 0, -3],
    [-3, 0, 0],
    [3, 0, 0],
    [-3, 0, 3],
    [0, 0, 3],
    [3, 0, 3],
  ]

  return (
    <group>
      {/* Network Nodes */}
      {nodePositions.map((position, index) => (
        <mesh key={index} ref={(el) => (nodesRef.current[index] = el)} position={position as [number, number, number]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color={index === 0 ? "#ff0000" : index === 1 ? "#ffff00" : "#00ff00"}
            emissive={index === 0 ? "#ff0000" : index === 1 ? "#ffff00" : "#00ff00"}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* Connection Lines */}
      {connections.map((connection, index) => {
        const fromPos = nodePositions[connection.from]
        const toPos = nodePositions[connection.to]
        return (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([...fromPos, ...toPos])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00ff00" opacity={0.6} transparent />
          </line>
        )
      })}
    </group>
  )
}

function AdvancedTerminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<
    Array<{ command: string; output: string; type: "success" | "error" | "warning" }>
  >([
    {
      command: "system_init",
      output:
        "HACKER_NET v2.0 initialized\nAdvanced penetration testing suite loaded...\nType 'help' for available commands",
      type: "success",
    },
  ])
  const [currentDir, setCurrentDir] = useState("/root/hacker")
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = {
    help: () => ({
      output: `Advanced Hacking Commands:
- nmap [target]: Network mapping and port scanning
- metasploit: Launch Metasploit framework
- wireshark: Start packet capture
- sqlmap [url]: SQL injection testing
- burpsuite: Web application security testing
- aircrack [interface]: WiFi security auditing
- john [hashfile]: Password cracking with John the Ripper
- hydra [target]: Brute force attack tool
- nikto [url]: Web server scanner
- gobuster [url]: Directory/file brute forcer
- social-engineer: Social engineering toolkit
- payload-generator: Create custom payloads
- steganography: Hide data in images
- forensics: Digital forensics toolkit
- clear: Clear terminal
- whoami: Display current user`,
      type: "success" as const,
    }),

    nmap: () => ({
      output: `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for target (192.168.1.100)
Host is up (0.00034s latency).
Not shown: 996 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3389/tcp open  ms-wbt-server

Nmap scan report for target (10.0.0.50)
Host is up (0.00021s latency).
PORT     STATE SERVICE
21/tcp   open  ftp
23/tcp   open  telnet
53/tcp   open  domain
135/tcp  open  msrpc

Nmap done: 2 IP addresses (2 hosts up) scanned in 13.37 seconds`,
      type: "warning" as const,
    }),

    metasploit: () => ({
      output: `       =[ metasploit v6.3.42-dev                          ]
+ -- --=[ 2357 exploits - 1220 auxiliary - 413 post       ]
+ -- --=[ 951 payloads - 45 encoders - 11 nops            ]
+ -- --=[ 9 evasion                                        ]

msf6 > use exploit/windows/smb/ms17_010_eternalblue
[*] No payload configured, defaulting to windows/x64/meterpreter/reverse_tcp
msf6 exploit(windows/smb/ms17_010_eternalblue) > set RHOSTS 192.168.1.100
RHOSTS => 192.168.1.100
msf6 exploit(windows/smb/ms17_010_eternalblue) > exploit

[*] Started reverse TCP handler on 192.168.1.50:4444 
[*] Sending stage (200262 bytes) to 192.168.1.100
[*] Meterpreter session 1 opened (192.168.1.50:4444 -> 192.168.1.100:49158)

meterpreter > sysinfo
Computer        : VICTIM-PC
OS              : Windows 10 (10.0 Build 19041).
Architecture    : x64
System Language : en_US
Domain          : WORKGROUP
Logged On Users : 2
Meterpreter     : x64/windows`,
      type: "error" as const,
    }),

    wireshark: () => ({
      output: `Starting Wireshark packet capture...
Interface: eth0 (192.168.1.0/24)

Captured packets:
1. 192.168.1.100 -> 8.8.8.8 DNS query for facebook.com
2. 192.168.1.100 -> 157.240.1.35 HTTPS login attempt
3. 192.168.1.101 -> 192.168.1.1 FTP login: user=admin pass=password123
4. 192.168.1.102 -> 10.0.0.1 Telnet session (unencrypted)
5. 192.168.1.103 -> 172.16.0.1 SMB file transfer

[ALERT] Unencrypted credentials detected!
[ALERT] Suspicious traffic patterns identified!
Packets captured: 13,337 | Credentials found: 42`,
      type: "warning" as const,
    }),

    sqlmap: () => ({
      output: `        ___
       __H__
 ___ ___[)]_____ ___ ___  {1.7.11#stable}
|_ -| . [']     | .'| . |
|___|_  ["]_|_|_|__,|  _|
      |_|V...       |_|   https://sqlmap.org

[*] starting @ 23:59:59 /2024-10-31/

[23:59:59] [INFO] testing connection to the target URL
[23:59:59] [INFO] checking if the target is protected by some kind of WAF/IPS
[00:00:01] [INFO] testing if the target URL content is stable
[00:00:02] [INFO] target URL content is stable
[00:00:02] [INFO] testing if GET parameter 'id' is dynamic
[00:00:03] [INFO] GET parameter 'id' appears to be dynamic
[00:00:03] [INFO] heuristic (basic) test shows that GET parameter 'id' might be injectable
[00:00:04] [CRITICAL] SQL injection vulnerability found!
Parameter: id (GET)
    Type: boolean-based blind
    Title: AND boolean-based blind - WHERE or HAVING clause
    Payload: id=1' AND 1337=1337 AND 'admin'='admin

Database: mysql_corporate_db
Tables: users, passwords, credit_cards, secrets
[00:00:05] [INFO] dumping database contents...
[00:00:06] [INFO] retrieved 13,337 password hashes`,
      type: "error" as const,
    }),

    clear: () => ({ output: "", type: "success" as const, clear: true }),

    whoami: () => ({
      output:
        "root@hacker-net:~$ You are the Digital Ghost\nUID: 0 | GID: 0 | Groups: root,shadow,elite,anonymous\nPrivileges: UNLIMITED\nAccess Level: GOD MODE",
      type: "success" as const,
    }),
  }

  const executeCommand = (cmd: string) => {
    const [command, ...args] = cmd.toLowerCase().trim().split(" ")

    if (command === "clear") {
      setHistory([])
      return
    }

    let result
    if (command in commands) {
      result = (commands as any)[command]()
    } else if (command.startsWith("nikto")) {
      const target = args[0] || "target.com"
      result = {
        output: `- Nikto v2.5.0
---------------------------------------------------------------------------
+ Target IP:          ${target}
+ Target Hostname:    ${target}
+ Target Port:        80
+ Start Time:         2024-10-31 23:59:59 (GMT0)
---------------------------------------------------------------------------
+ Server: Apache/2.4.41 (Ubuntu)
+ Retrieved x-powered-by header: PHP/7.4.3
+ The anti-clickjacking X-Frame-Options header is not present.
+ The X-XSS-Protection header is not defined.
+ OSVDB-3233: /icons/README: Apache default file found.
+ /admin/: Admin login page/section found.
+ /backup/: Backup directory found.
+ /config/: Configuration information may be available remotely.
+ OSVDB-3092: /admin/: This might be interesting...
+ OSVDB-3268: /config/: Directory indexing found.
+ OSVDB-3233: /icons/README: Apache default file found.
+ 7915 requests: 0 error(s) and 42 item(s) reported on remote host`,
        type: "warning" as const,
      }
    } else {
      result = {
        output: `Command '${command}' not found. Type 'help' for available commands.`,
        type: "error" as const,
      }
    }

    setHistory((prev) => [...prev, { command: cmd, output: result.output, type: result.type }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      executeCommand(input)
      setInput("")
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  return (
    <Card className="bg-black border-green-800 shadow-2xl shadow-green-900/50">
      <CardHeader className="bg-green-950/30">
        <CardTitle className="text-green-400 flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          ADVANCED PENETRATION TESTING SUITE
        </CardTitle>
        <CardDescription className="text-green-300">
          Professional hacking toolkit with nmap, metasploit, and more
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-black/90 p-0">
        <div
          ref={terminalRef}
          className="h-96 overflow-y-auto p-4 font-mono text-sm scrollbar-thin scrollbar-track-green-950 scrollbar-thumb-green-600"
        >
          {history.map((entry, index) => (
            <div key={index} className="mb-2">
              <div className="text-green-400">
                <span className="text-green-500">root@hacker-net</span>
                <span className="text-green-300">:{currentDir}#</span> {entry.command}
              </div>
              <div
                className={`whitespace-pre-line ${
                  entry.type === "error"
                    ? "text-red-400"
                    : entry.type === "warning"
                      ? "text-yellow-400"
                      : "text-green-200"
                }`}
              >
                {entry.output}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="border-t border-green-900 p-4">
          <div className="flex items-center gap-2">
            <span className="text-green-500 font-mono text-sm">root@hacker-net</span>
            <span className="text-green-300 font-mono text-sm">:{currentDir}#</span>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent border-none text-green-200 font-mono focus:ring-0 focus:outline-none"
              placeholder="Enter command (try: nmap, metasploit, wireshark)..."
              autoComplete="off"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default function HackerWebsite() {
  const [isLoading, setIsLoading] = useState(true)
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return <HorrorPreloader onComplete={() => setIsLoading(false)} />
  }

  return (
    <div className="min-h-screen bg-black text-green-100 scanlines relative overflow-hidden">
      <MatrixRain />

      <header className="relative z-10 p-6 border-b border-green-900/50 bg-black/90 shadow-2xl shadow-green-900/50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skull className={`w-8 h-8 text-green-500 ${glitchActive ? "glitch-effect animate-spin" : ""}`} />
            <h1 className="text-2xl font-bold text-green-400 text-shadow-glow">
              HACKER_NET
              <span className="text-xs text-green-600 block">v1.337</span>
            </h1>
          </div>
          <nav className="flex gap-4">
            <Button className="text-green-400 hover:bg-green-900/30 border border-green-800">
              <Terminal className="w-4 h-4 mr-2" />
              TERMINAL
            </Button>
            <Button className="text-green-300 hover:bg-green-900/30 border border-green-800">
              <Network className="w-4 h-4 mr-2" />
              NETWORK
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative z-10 py-20 bg-gradient-to-b from-black via-green-950/20 to-black">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-900 text-green-100 border-green-700 font-bold animate-pulse">
                CLASSIFIED ACCESS
              </Badge>
              <h2 className="text-6xl font-bold mb-6 text-green-400 text-shadow-glow">
                ENTER THE
                <br />
                <span className={`text-green-500 ${glitchActive ? "glitch-effect" : ""}`}>MATRIX</span>
              </h2>
              <p className="text-xl mb-8 text-green-200 leading-relaxed">
                Welcome to the digital underground where reality bends to code and information is power. Navigate the
                shadows of cyberspace where only the elite dare to tread.
              </p>
              <div className="flex gap-4">
                <Button className="bg-green-800 text-green-100 hover:bg-green-700 pulse-glow">
                  <Zap className="w-4 h-4 mr-2" />
                  JACK IN
                </Button>
                <Button
                  variant="outline"
                  className="border-green-600 text-green-400 hover:bg-green-900/30 bg-transparent"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  OBSERVE
                </Button>
              </div>
            </div>

            <div className="h-96 relative">
              <ThreeJSWrapper>
                <Canvas camera={{ position: [0, 2, 8] }}>
                  <ambientLight intensity={0.1} />
                  <pointLight position={[10, 10, 10]} color="#00ff00" intensity={2} />
                  <NetworkVisualization />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                  <Environment preset="night" />
                </Canvas>
              </ThreeJSWrapper>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">SYSTEM STATUS</h3>
              <TerminalText />
            </div>
            <div>
              <AdvancedTerminal />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 bg-gradient-to-b from-black via-blue-950/10 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-blue-400 mb-12 text-center text-shadow-glow">
            ADVANCED HACKING ARSENAL
          </h2>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Vulnerability Scanner */}
            <Card className="bg-black/80 border-blue-800 shadow-2xl shadow-blue-900/50">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  VULN SCANNER
                </CardTitle>
                <CardDescription className="text-blue-300">Automated vulnerability detection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-200">CVE Database:</span>
                    <span className="text-green-400">200,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Zero-Days:</span>
                    <span className="text-red-400 animate-pulse">1,337</span>
                  </div>
                  <div className="bg-blue-950/50 p-2 rounded border border-blue-800">
                    <div className="text-xs text-blue-300">Latest Scan:</div>
                    <div className="text-red-400">CRITICAL: RCE Found</div>
                    <div className="text-yellow-400">HIGH: SQL Injection</div>
                    <div className="text-orange-400">MEDIUM: XSS Detected</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Password Cracker */}
            <Card className="bg-black/80 border-blue-800 shadow-2xl shadow-blue-900/50">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  PASSWORD CRACKER
                </CardTitle>
                <CardDescription className="text-blue-300">Multi-algorithm hash cracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-200">Hash Rate:</span>
                    <span className="text-green-400">1.3 TH/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Cracked Today:</span>
                    <span className="text-yellow-400">13,337</span>
                  </div>
                  <div className="bg-blue-950/50 p-2 rounded border border-blue-800">
                    <div className="text-xs text-blue-300">Active Attacks:</div>
                    <div className="text-green-400">MD5: 95% complete</div>
                    <div className="text-yellow-400">SHA256: 67% complete</div>
                    <div className="text-red-400">bcrypt: 23% complete</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Traffic Interceptor */}
            <Card className="bg-black/80 border-blue-800 shadow-2xl shadow-blue-900/50">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  TRAFFIC INTERCEPTOR
                </CardTitle>
                <CardDescription className="text-blue-300">Real-time packet analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-200">Packets/sec:</span>
                    <span className="text-green-400 animate-pulse">42,069</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Credentials:</span>
                    <span className="text-red-400">666</span>
                  </div>
                  <div className="bg-blue-950/50 p-2 rounded border border-blue-800">
                    <div className="text-xs text-blue-300">Intercepted:</div>
                    <div className="text-red-400">Banking Login</div>
                    <div className="text-yellow-400">Email Password</div>
                    <div className="text-green-400">API Keys</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payload Factory */}
            <Card className="bg-black/80 border-blue-800 shadow-2xl shadow-blue-900/50">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  PAYLOAD FACTORY
                </CardTitle>
                <CardDescription className="text-blue-300">Custom exploit generation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-200">Templates:</span>
                    <span className="text-green-400">1,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">AV Evasion:</span>
                    <span className="text-yellow-400">98.7%</span>
                  </div>
                  <div className="bg-blue-950/50 p-2 rounded border border-blue-800">
                    <div className="text-xs text-blue-300">Generated:</div>
                    <div className="text-green-400">Reverse Shell</div>
                    <div className="text-yellow-400">Keylogger</div>
                    <div className="text-red-400">Ransomware</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 bg-black/70">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-purple-400 mb-12 text-center text-shadow-glow">
            DARK WEB MARKETPLACE
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-black/80 border-purple-800 shadow-2xl shadow-purple-900/50">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Wifi className="w-5 h-5" />
                  DIGITAL CONTRABAND
                </CardTitle>
                <CardDescription className="text-purple-300">Forbidden digital goods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-purple-950/50 p-3 rounded border border-purple-800">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-purple-400 font-bold">Zero-Day Exploit Pack</div>
                        <div className="text-purple-300 text-xs">Windows/Linux/MacOS</div>
                      </div>
                      <div className="text-yellow-400">₿ 13.37</div>
                    </div>
                  </div>
                  <div className="bg-red-950/50 p-3 rounded border border-red-800">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-red-400 font-bold">Government Database Access</div>
                        <div className="text-red-300 text-xs">Classified Information</div>
                      </div>
                      <div className="text-yellow-400">₿ 66.6</div>
                    </div>
                  </div>
                  <div className="bg-green-950/50 p-3 rounded border border-green-800">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-green-400 font-bold">Identity Package</div>
                        <div className="text-green-300 text-xs">Complete new identity</div>
                      </div>
                      <div className="text-yellow-400">₿ 42.0</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-purple-800 shadow-2xl shadow-purple-900/50">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  HACKER SERVICES
                </CardTitle>
                <CardDescription className="text-purple-300">Professional cyber operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-orange-950/50 p-3 rounded border border-orange-800">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-orange-400 font-bold">Corporate Espionage</div>
                        <div className="text-orange-300 text-xs">Steal competitor secrets</div>
                      </div>
                      <div className="text-yellow-400">₿ 100.0</div>
                    </div>
                  </div>
                  <div className="bg-blue-950/50 p-3 rounded border border-blue-800">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-blue-400 font-bold">Social Media Manipulation</div>
                        <div className="text-blue-300 text-xs">Control public opinion</div>
                      </div>
                      <div className="text-yellow-400">₿ 25.5</div>
                    </div>
                  </div>
                  <div className="bg-pink-950/50 p-3 rounded border border-pink-800">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-pink-400 font-bold">Digital Assassination</div>
                        <div className="text-pink-300 text-xs">Erase someone digitally</div>
                      </div>
                      <div className="text-yellow-400">₿ 77.7</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 bg-gradient-to-b from-black via-red-950/10 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-red-400 mb-12 text-center text-shadow-glow">
            CYBER WARFARE OPERATIONS
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* APT Command Center */}
            <Card className="bg-black/80 border-red-800 shadow-2xl shadow-red-900/50">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  APT COMMAND CENTER
                </CardTitle>
                <CardDescription className="text-red-300">Advanced Persistent Threats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-red-200">Active Campaigns:</span>
                    <span className="text-yellow-400 animate-pulse">42</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-200">Compromised Networks:</span>
                    <span className="text-green-400">13,337</span>
                  </div>
                  <div className="bg-red-950/50 p-2 rounded border border-red-800">
                    <div className="text-xs text-red-300">Current Operations:</div>
                    <div className="text-yellow-400">Operation Ghost Protocol</div>
                    <div className="text-orange-400">Operation Dark Mirror</div>
                    <div className="text-red-400">Operation Digital Storm</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nation State Arsenal */}
            <Card className="bg-black/80 border-red-800 shadow-2xl shadow-red-900/50">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  NATION STATE ARSENAL
                </CardTitle>
                <CardDescription className="text-red-300">Military-grade cyber weapons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-red-200">Stuxnet Variants:</span>
                    <span className="text-red-400">7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-200">Infrastructure Targets:</span>
                    <span className="text-yellow-400">666</span>
                  </div>
                  <div className="bg-red-950/50 p-2 rounded border border-red-800">
                    <div className="text-xs text-red-300">Available Weapons:</div>
                    <div className="text-red-400">Power Grid Killer</div>
                    <div className="text-orange-400">Financial System Virus</div>
                    <div className="text-yellow-400">Communication Jammer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Psychological Operations */}
            <Card className="bg-black/80 border-red-800 shadow-2xl shadow-red-900/50">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  PSYOPS DIVISION
                </CardTitle>
                <CardDescription className="text-red-300">Information warfare tactics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-red-200">Disinformation Campaigns:</span>
                    <span className="text-yellow-400">1,337</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-200">Manipulated Accounts:</span>
                    <span className="text-red-400">2.1M</span>
                  </div>
                  <div className="bg-red-950/50 p-2 rounded border border-red-800">
                    <div className="text-xs text-red-300">Active Operations:</div>
                    <div className="text-purple-400">Mind Control Protocol</div>
                    <div className="text-pink-400">Reality Distortion Field</div>
                    <div className="text-red-400">Chaos Amplification</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 bg-gradient-to-b from-black via-cyan-950/10 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-cyan-400 mb-12 text-center text-shadow-glow">DIGITAL FORENSICS LAB</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-black/80 border-cyan-800 shadow-2xl shadow-cyan-900/50">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  EVIDENCE ANALYSIS
                </CardTitle>
                <CardDescription className="text-cyan-300">Advanced digital investigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-cyan-950/50 p-3 rounded border border-cyan-800">
                    <div className="text-cyan-400 font-bold mb-2">Active Cases:</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-cyan-200">Corporate Breach #2024-1337</span>
                        <span className="text-green-400">SOLVED</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-200">Government Leak #2024-666</span>
                        <span className="text-yellow-400">ANALYZING</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-200">Ransomware Attack #2024-420</span>
                        <span className="text-red-400">CRITICAL</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-cyan-950/50 p-3 rounded border border-cyan-800">
                    <div className="text-cyan-400 font-bold mb-2">Recovery Stats:</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-cyan-200">Deleted Files Recovered:</span>
                        <span className="text-green-400">42,069</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-200">Encrypted Data Cracked:</span>
                        <span className="text-yellow-400">13,337 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-200">Network Traces Found:</span>
                        <span className="text-red-400">666</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-cyan-800 shadow-2xl shadow-cyan-900/50">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  STEGANOGRAPHY DETECTOR
                </CardTitle>
                <CardDescription className="text-cyan-300">Hidden data extraction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-cyan-950/50 p-3 rounded border border-cyan-800">
                    <div className="text-cyan-400 font-bold mb-2">Hidden Messages Found:</div>
                    <div className="space-y-1">
                      <div className="text-green-400">✓ vacation_photo.jpg → Secret coordinates</div>
                      <div className="text-green-400">✓ meeting_notes.pdf → Encrypted passwords</div>
                      <div className="text-yellow-400">⚠ company_logo.png → Suspicious payload</div>
                      <div className="text-red-400">⚠ invoice.docx → Malware detected</div>
                    </div>
                  </div>
                  <div className="bg-cyan-950/50 p-3 rounded border border-cyan-800">
                    <div className="text-cyan-400 font-bold mb-2">Analysis Tools:</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-cyan-200">LSB Analysis:</span>
                        <span className="text-green-400">ACTIVE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-200">Frequency Domain:</span>
                        <span className="text-green-400">ACTIVE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-200">Metadata Extraction:</span>
                        <span className="text-green-400">ACTIVE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 bg-gradient-to-b from-black via-yellow-950/10 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-yellow-400 mb-12 text-center text-shadow-glow">
            CRYPTOCURRENCY OPERATIONS
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Mining Farm */}
            <Card className="bg-black/80 border-yellow-800 shadow-2xl shadow-yellow-900/50">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  MINING FARM
                </CardTitle>
                <CardDescription className="text-yellow-300">Distributed mining network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-yellow-200">Hash Rate:</span>
                    <span className="text-green-400 animate-pulse">1.337 EH/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-200">Active Miners:</span>
                    <span className="text-yellow-400">13,337</span>
                  </div>
                  <div className="bg-yellow-950/50 p-2 rounded border border-yellow-800">
                    <div className="text-xs text-yellow-300">Mining Pools:</div>
                    <div className="text-green-400">Bitcoin: 42.0 BTC/day</div>
                    <div className="text-blue-400">Ethereum: 666 ETH/day</div>
                    <div className="text-purple-400">Monero: 1,337 XMR/day</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Money Laundering */}
            <Card className="bg-black/80 border-yellow-800 shadow-2xl shadow-yellow-900/50">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  DIGITAL LAUNDROMAT
                </CardTitle>
                <CardDescription className="text-yellow-300">Cryptocurrency mixing service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-yellow-200">Daily Volume:</span>
                    <span className="text-green-400">₿ 420.69</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-200">Mixing Rounds:</span>
                    <span className="text-yellow-400">13</span>
                  </div>
                  <div className="bg-yellow-950/50 p-2 rounded border border-yellow-800">
                    <div className="text-xs text-yellow-300">Services:</div>
                    <div className="text-green-400">Tumbler: 99.9% anonymity</div>
                    <div className="text-blue-400">Chain Hopping: Multi-coin</div>
                    <div className="text-purple-400">Privacy Coins: Untraceable</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DeFi Exploits */}
            <Card className="bg-black/80 border-yellow-800 shadow-2xl shadow-yellow-900/50">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  DEFI EXPLOIT ENGINE
                </CardTitle>
                <CardDescription className="text-yellow-300">Smart contract vulnerabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-yellow-200">Flash Loans:</span>
                    <span className="text-red-400">$13.37M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-200">Rug Pulls:</span>
                    <span className="text-yellow-400">42</span>
                  </div>
                  <div className="bg-yellow-950/50 p-2 rounded border border-yellow-800">
                    <div className="text-xs text-yellow-300">Recent Exploits:</div>
                    <div className="text-red-400">Reentrancy Attack: $2.1M</div>
                    <div className="text-orange-400">Oracle Manipulation: $666K</div>
                    <div className="text-yellow-400">Governance Hack: $420K</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 bg-gradient-to-b from-black via-indigo-950/10 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-indigo-400 mb-12 text-center text-shadow-glow">
            SURVEILLANCE NETWORK
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-black/80 border-indigo-800 shadow-2xl shadow-indigo-900/50">
              <CardHeader>
                <CardTitle className="text-indigo-400 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  GLOBAL MONITORING
                </CardTitle>
                <CardDescription className="text-indigo-300">Worldwide surveillance operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-indigo-950/50 p-3 rounded border border-indigo-800">
                    <div className="text-indigo-400 font-bold mb-2">Active Surveillance:</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-indigo-200">CCTV Networks:</span>
                        <span className="text-green-400">2.1M cameras</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-indigo-200">Phone Taps:</span>
                        <span className="text-yellow-400">666K lines</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-indigo-200">Internet Traffic:</span>
                        <span className="text-red-400">100% monitored</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-indigo-950/50 p-3 rounded border border-indigo-800">
                    <div className="text-indigo-400 font-bold mb-2">Target Categories:</div>
                    <div className="space-y-1">
                      <div className="text-red-400">⚠ High Value Targets: 1,337</div>
                      <div className="text-yellow-400">⚠ Political Figures: 420</div>
                      <div className="text-green-400">⚠ Corporate Leaders: 666</div>
                      <div className="text-purple-400">⚠ Journalists: 42</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-indigo-800 shadow-2xl shadow-indigo-900/50">
              <CardHeader>
                <CardTitle className="text-indigo-400 flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  FACIAL RECOGNITION
                </CardTitle>
                <CardDescription className="text-indigo-300">AI-powered identification system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-indigo-950/50 p-3 rounded border border-indigo-800">
                    <div className="text-indigo-400 font-bold mb-2">Recognition Stats:</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-indigo-200">Database Size:</span>
                        <span className="text-green-400">13.37B faces</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-indigo-200">Accuracy Rate:</span>
                        <span className="text-yellow-400">99.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-indigo-200">Daily Scans:</span>
                        <span className="text-red-400 animate-pulse">42M</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-indigo-950/50 p-3 rounded border border-indigo-800">
                    <div className="text-indigo-400 font-bold mb-2">Recent Matches:</div>
                    <div className="space-y-1">
                      <div className="text-green-400">✓ Target Alpha: Location confirmed</div>
                      <div className="text-yellow-400">⚠ Target Beta: Movement tracked</div>
                      <div className="text-red-400">⚠ Target Gamma: High priority</div>
                      <div className="text-purple-400">⚠ Unknown: New face detected</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 bg-gradient-to-b from-black via-teal-950/10 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-teal-400 mb-12 text-center text-shadow-glow">QUANTUM COMPUTING LAB</h2>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="bg-black/80 border-teal-800 shadow-2xl shadow-teal-900/50">
              <CardHeader>
                <CardTitle className="text-teal-400 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  QUANTUM PROCESSOR
                </CardTitle>
                <CardDescription className="text-teal-300">Next-gen quantum computing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-teal-200">Qubits:</span>
                    <span className="text-green-400 animate-pulse">1,337</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Coherence Time:</span>
                    <span className="text-yellow-400">42.0 ms</span>
                  </div>
                  <div className="bg-teal-950/50 p-2 rounded border border-teal-800">
                    <div className="text-xs text-teal-300">Current Tasks:</div>
                    <div className="text-green-400">RSA-2048 Factorization</div>
                    <div className="text-yellow-400">AES-256 Brute Force</div>
                    <div className="text-red-400">Blockchain Mining</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-teal-800 shadow-2xl shadow-teal-900/50">
              <CardHeader>
                <CardTitle className="text-teal-400 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  ENCRYPTION BREAKER
                </CardTitle>
                <CardDescription className="text-teal-300">Quantum cryptanalysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-teal-200">Keys Broken:</span>
                    <span className="text-red-400">666K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Success Rate:</span>
                    <span className="text-green-400">99.9%</span>
                  </div>
                  <div className="bg-teal-950/50 p-2 rounded border border-teal-800">
                    <div className="text-xs text-teal-300">Algorithms:</div>
                    <div className="text-green-400">Shor's Algorithm</div>
                    <div className="text-yellow-400">Grover's Algorithm</div>
                    <div className="text-red-400">Custom Quantum Attacks</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-teal-800 shadow-2xl shadow-teal-900/50">
              <CardHeader>
                <CardTitle className="text-teal-400 flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  QUANTUM NETWORK
                </CardTitle>
                <CardDescription className="text-teal-300">Entangled communication</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-teal-200">Entangled Pairs:</span>
                    <span className="text-purple-400">13.37M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Network Nodes:</span>
                    <span className="text-teal-400">42</span>
                  </div>
                  <div className="bg-teal-950/50 p-2 rounded border border-teal-800">
                    <div className="text-xs text-teal-300">Capabilities:</div>
                    <div className="text-green-400">Instant Communication</div>
                    <div className="text-yellow-400">Unbreakable Encryption</div>
                    <div className="text-red-400">Quantum Teleportation</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 bg-gradient-to-b from-black via-pink-950/10 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-pink-400 mb-12 text-center text-shadow-glow">AI WARFARE DIVISION</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-black/80 border-pink-800 shadow-2xl shadow-pink-900/50">
              <CardHeader>
                <CardTitle className="text-pink-400 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  AUTONOMOUS WEAPONS
                </CardTitle>
                <CardDescription className="text-pink-300">AI-powered cyber weapons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-pink-950/50 p-3 rounded border border-pink-800">
                    <div className="text-pink-400 font-bold mb-2">Active AI Agents:</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-pink-200">Hunter-Killer Bots:</span>
                        <span className="text-red-400 animate-pulse">1,337</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-pink-200">Social Manipulators:</span>
                        <span className="text-yellow-400">666</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-pink-200">Data Miners:</span>
                        <span className="text-green-400">42,069</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-pink-950/50 p-3 rounded border border-pink-800">
                    <div className="text-pink-400 font-bold mb-2">Mission Status:</div>
                    <div className="space-y-1">
                      <div className="text-green-400">✓ Operation Mind Control: Complete</div>
                      <div className="text-yellow-400">⚠ Operation Deep Fake: 67% complete</div>
                      <div className="text-red-400">⚠ Operation Singularity: Initializing</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-pink-800 shadow-2xl shadow-pink-900/50">
              <CardHeader>
                <CardTitle className="text-pink-400 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  NEURAL NETWORKS
                </CardTitle>
                <CardDescription className="text-pink-300">Advanced AI architectures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-pink-950/50 p-3 rounded border border-pink-800">
                    <div className="text-pink-400 font-bold mb-2">Network Stats:</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-pink-200">Parameters:</span>
                        <span className="text-green-400">1.337T</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-pink-200">Training Data:</span>
                        <span className="text-yellow-400">666 PB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-pink-200">Compute Power:</span>
                        <span className="text-red-400">42 ExaFLOPS</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-pink-950/50 p-3 rounded border border-pink-800">
                    <div className="text-pink-400 font-bold mb-2">Capabilities:</div>
                    <div className="space-y-1">
                      <div className="text-purple-400">• Perfect Deep Fakes</div>
                      <div className="text-blue-400">• Voice Synthesis</div>
                      <div className="text-green-400">• Behavior Prediction</div>
                      <div className="text-red-400">• Consciousness Simulation</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-green-900 py-8 bg-black/90">
        <div className="container mx-auto px-6 text-center">
          <p className="text-green-400 font-mono">© 2025 HACKER_NET - saman tofighian</p>
          <p className="text-xs text-green-500 mt-2 animate-pulse">[SECURE CONNECTION ESTABLISHED]</p>
        </div>
      </footer>
    </div>
  )
}
