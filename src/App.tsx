import { FormEvent, useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import BurningCalendar from "./components/BurningCalendar/BurningCalendar"
import { fireEvents } from "./components/BurningCalendar/fireEvents"
import HotspotMap from "./components/HotspotMap/Hotspotmap.tsx"
import LoginModal from "./components/Auth/LoginModal"
import Surfie from "./components/Surfie/Surfie"
import { CITY_NAMES, clearToken, fetchMe, getToken, saveToken, signup, type SessionUser } from "./lib/auth"

const images = {
  earth:
    "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=1600&q=88",
  forest:
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=88",
  smoke:
    "https://images.unsplash.com/photo-1634224548788-58de1fb48e2b?auto=format&fit=crop&w=1200&q=88",
  aerial:
    "https://images.unsplash.com/photo-1678303526489-60dd82c18513?auto=format&fit=crop&w=1200&q=88",
  fire: "https://images.unsplash.com/photo-1510455415134-1cff57e0522a?auto=format&fit=crop&w=1200&q=88",
}

const diary = [
  {
    date: "May 18, 2003",
    place: "Lake Baikal Region, Russia",
    note:
      "Persistent, intense smoke and a massive fire complex are visible, leading to widespread carbon emissions and air pollution across the area.",
    image:
      "https://imgs.mongabay.com/wp-content/uploads/sites/20/2020/07/23110144/GP1SU5IX_PressMedia.jpg",
  },
  {
    date: "August 18, 2010",
    place: "Amazonian Region, Bolivia",
    note:
      "Extreme drought caused over 25,000 active fire focus areas, burning more than 3.7 million hectares of forest and prompting a national state of emergency.",
    image:
      "https://www.aljazeera.com/wp-content/uploads/2011/09/2011920111118238965_20.jpeg",
  },
  {
    date: "July 08, 2014",
    place: "Northwest Territories, Canada",
    note:
      "Severe drought and lightning strikes ignited unprecedented boreal forest fires, burning 3.4 million hectares of land and sending smoke blanket across North America.",
    image:
      "https://bulletin.cmos.ca/wp-content/uploads/2019/04/banner_wildfire_CMOS.jpg",
  },
  {
    date: "May 08, 2016",
    place: "Alberta, Canada",
    note: "A fast-moving wildfire prompted the largest evacuation in Alberta's history.",
    image: images.aerial,
  },
  {
    date: "December 30, 2019",
    place: "Southeastern Australia",
    note:
      "Unprecedented record heat and severe drought ignited catastrophic mega-fires that burned over 24 million hectares, destroyed thousands of homes, and impacted nearly 3 billion animals across the continent.",
    image:
      "https://www.preventionweb.net/sites/default/files/styles/ultrawide_16_6/public/2022-08/Collection%20page%20image%20Australian%20Bushfire%202019-20.jpg?h=00975b30&itok=rUxKVnNf",
  },
  {
    date: "September 11, 2020",
    place: "Idaho, Western United States",
    note: "Over one million acres burned as smoke traveled across the continent.",
    image: images.smoke,
  },
  {
    date: "August 12, 2021",
    place: "Sakha Republic, Russia",
    note:
      "Historic heatwaves and severe drought sparked the largest wildfire season in recorded history, burning over 18.1 million hectares of taiga forest and sending massive smoke plumes all the way to the North Pole.",
    image:
      "https://static.themoscowtimes.com/image/article_1360/ee/TASS_47530367.jpg",
  },
  {
    date: "June 07, 2023",
    place: "Quebec & Western Canada",
    note:
      "Widespread record warmth and severe drought fueled Canada's most destructive wildfire season in recorded history, scorching over 18.5 million hectares and blanketing major North American cities in dense hazardous smoke.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/17/Massive_fires_in_Qu%C3%A9bec%2C_Canada_%28Lat-_53_33%2C_Lng-_-76_11%29_-_28_June_2023_%2853013814798%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
  },
  {
    date: "August 18, 2023",
    place: "British Columbia, Canada",
    note: "Extreme heat and dry conditions fueled a historic fire season.",
    image: images.fire,
  },
  {
    date: "February 27, 2024",
    place: "Texas Panhandle, United States",
    note:
      "High winds, dry vegetation, and unseasonably warm temperatures ignited the historic Smokehouse Creek Fire, which burned over 1.05 million acres to become the largest wildfire in Texas history.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Smoke_from_the_Smokehouse_Creek_Fire_%282024-02-27%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
  },
  {
    date: "January 09, 2026",
    place: "Victoria & Southeastern Australia",
    note:
      "Early-year heatwaves and strong dry winds ignited fast-moving bushfire complexes across southeastern Australia, consuming thousands of hectares of forest and farmland while forcing localized evacuations.",
    image:
      "https://i.guim.co.uk/img/media/adae8a8cfca5e7e92d53d3f48c7a323da7f1a4b6/0_0_2048_1536/master/2048.jpg?width=465&dpr=1&s=none&crop=none",
  },
  {
    date: "July 27, 2026",
    place: "Iberian Peninsula & Southern France",
    note:
      "Extreme heatwaves and prolonged drought ignited widespread mega-fires burning over 700,000 hectares, pushing air pollution across Western Europe and triggering extensive emergency evacuations.",
    image:
      "https://img.lemde.fr/2026/07/01/0/0/9504/6336/1440/960/60/0/e1afe00_ftp-1-2ggie8eteccv-5504038-01-06.jpg",
  },
  {
    date: "September 01, 2026",
    place: "Sumatra & Kalimantan, Indonesia",
    note:
      "Extended dry weather ignited widespread peatland and agricultural land fires, producing severe transboundary haze across Southeast Asia, degrading air quality, and releasing massive carbon emissions.",
    image:
      "https://imgs.mongabay.com/wp-content/uploads/sites/20/2026/07/02074421/Forest-and-land-fires-in-West-Kalimantan.jpg",
  },
  {
    date: "October 12, 2026",
    place: "Amazon Basin & Pantanal, South America",
    note:
      "Severe multi-year drought coupled with extreme heat sparked rampant fires across the Amazon rainforest and Pantanal wetlands, scorching millions of hectares and producing dense smoke plumes spanning across multiple South American nations.",
    image:
      "https://assets.science.nasa.gov/content/dam/science/esd/eo/images/iotd/2026/fires-arrive-in-the-amazon-rainforest/amazofires_amo_20261012_lrg.jpg",
  },
]

const faqs = [
  {
    question: "How can satellites detect a wildfire?",
    answer:
      "Satellites do not detect flames directly. They observe infrared heat, smoke, vegetation change, and atmospheric patterns, then compare those signals over time.",
  },
  {
    question: "Is smoke from factories always obvious from space?",
    answer:
      "Not always. Industrial emissions can resemble cloud, dust, or wildfire smoke. Scientists combine imagery with wind, temperature, and ground sensor data.",
  },
  {
    question: "What are the data sources of this platform?",
    answer:
      "Our stories combine open satellite imagery, public fire records, atmospheric models, and verified reporting. Each observation is timestamped and reviewed.",
  },
]

function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand ${light ? "text-cream" : "text-ink"}`}>
      The Surface
    </span>
  )
}

function RotatingEarth() {
  const globeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = globeRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0, 3.25)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.35
    renderer.domElement.setAttribute("aria-hidden", "true")
    mount.appendChild(renderer.domElement)

    const earthGroup = new THREE.Group()
    earthGroup.rotation.z = -0.16
    scene.add(earthGroup)

    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin("anonymous")

    const earthMaterial = new THREE.MeshStandardMaterial({
      color: 0x7da6c5,
      roughness: 0.82,
      metalness: 0.03,
    })
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 96, 96),
      earthMaterial,
    )
    earthGroup.add(earth)

    loader.load(
      "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg",
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
        earthMaterial.map = texture
        earthMaterial.needsUpdate = true
      },
    )

    const cloudMaterial = new THREE.MeshPhongMaterial({
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(1.008, 96, 96),
      cloudMaterial,
    )
    earthGroup.add(clouds)

    loader.load(
      "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-clouds.png",
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        cloudMaterial.map = texture
        cloudMaterial.alphaMap = texture
        cloudMaterial.needsUpdate = true
      },
    )

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.08, 96, 96),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          varying vec3 vertexNormal;
          void main() {
            vertexNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vertexNormal;
          void main() {
            float intensity = pow(0.72 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.25);
            gl_FragColor = vec4(0.18, 0.55, 1.0, 1.0) * intensity;
          }
        `,
      }),
    )
    scene.add(atmosphere)

    scene.add(new THREE.HemisphereLight(0xb9dcff, 0x06102f, 2.15))
    const sunlight = new THREE.DirectionalLight(0xffffff, 4.25)
    sunlight.position.set(-3, 2.2, 4)
    scene.add(sunlight)
    const rimLight = new THREE.DirectionalLight(0x3c78ff, 2.3)
    rimLight.position.set(4, -1, -2)
    scene.add(rimLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.55
    controls.rotateSpeed = 0.45

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect()
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)
    resize()

    const timer = new THREE.Timer()
    timer.connect(document)
    let frame = 0
    const animate = (timestamp: number) => {
      frame = requestAnimationFrame(animate)
      timer.update(timestamp)
      const delta = timer.getDelta()
      clouds.rotation.y += delta * 0.018
      controls.update()
      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      timer.dispose()
      resizeObserver.disconnect()
      controls.dispose()
      earth.geometry.dispose()
      earthMaterial.map?.dispose()
      earthMaterial.dispose()
      clouds.geometry.dispose()
      cloudMaterial.map?.dispose()
      cloudMaterial.dispose()
      atmosphere.geometry.dispose()
      atmosphere.material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={globeRef}
      className="hero-earth"
      role="img"
      aria-label="Interactive rotating three-dimensional model of Earth"
    />
  )
}

function App() {
  const [slide, setSlide] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)
  const [signupBusy, setSignupBusy] = useState(false)
  const [signupError, setSignupError] = useState("")
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState<SessionUser | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // Restore the session after a page reload.
  useEffect(() => {
    const saved = getToken()
    if (!saved) return
    fetchMe(saved)
      .then((u) => {
        setUser(u)
        setToken(saved)
      })
      .catch(() => clearToken())
  }, [])

  function handleLoggedIn(u: SessionUser, t: string) {
    saveToken(t)
    setUser(u)
    setToken(t)
    setShowLogin(false)
    setShowSignup(false)
  }

  function logout() {
    clearToken()
    setUser(null)
    setToken(null)
  }

  function submitEmail(event: FormEvent) {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  async function createAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget) // read before the await
    setSignupBusy(true)
    setSignupError("")
    try {
      const { token: t, user: u } = await signup({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        password: String(form.get("password") ?? ""),
        city: String(form.get("city") ?? ""),
      })
      saveToken(t) // signed in straight away, so Surfie knows the city
      setUser(u)
      setToken(t)
      setAccountCreated(true)
    } catch (err) {
      setSignupError(err instanceof Error ? err.message : "Could not create the account.")
    } finally {
      setSignupBusy(false)
    }
  }

  function openSignup() {
    setAccountCreated(false)
    setSignupError("")
    setShowSignup(true)
  }

  return (
    <main>
      <section className="hero" id="home">
        <nav className="nav wrap" aria-label="Main navigation">
          <Brand light />
          <div className="nav-links">
            <a href="#story">Stories</a>
            <a href="#observe">Observe</a>
            <a href="#about">About</a>
            {user ? (
              <button className="nav-join" onClick={logout}>
                {user.name.split(" ")[0]} · Log out
              </button>
            ) : (
              <>
                <a
                  href="#join"
                  onClick={(event) => {
                    event.preventDefault()
                    setShowLogin(true)
                  }}
                >
                  Sign in
                </a>
                <button className="nav-join" onClick={openSignup}>
                  Join
                </button>
              </>
            )}
          </div>
        </nav>
        <div className="hero-glow" />
        <RotatingEarth />
        <div className="hero-copy wrap">
          <span className="eyebrow light">Our Earth. Our surface.</span>
          <h1>
            How much do we
            <br />
            know about our Surface?
          </h1>
          <a className="text-link" href="#story">
            Begin the story <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section className="burning" id="story">
        <div className="burning-overlay" />
        <div className="wrap burning-grid">
          <div>
            <h2>
              The burning of
              <br />
              our Surface
            </h2>
          </div>
          <div className="story-copy">
            <p>
              What is a wildfire? A wildfire is an
              uncontrolled fire that burns through natural vegetation such as
              forests, grasslands, shrubland, or peat.
            </p>
            <p>
              What causes a wildfire? A fire needs fuel,
              oxygen, and heat. Lightning can supply the spark, but most
              wildfires are started by people, through unattended campfires,
              discarded cigarettes, sparks from power lines or machinery, or
              agricultural burns that escape control. Hot, dry, windy weather
              and drought leave vegetation ready to burn.
            </p>
            <p>
              How does it spread? Flames dry and preheat the
              vegetation ahead of them, and wind pushes the fire forward. Fire
              travels faster uphill, and burning embers can be carried ahead of
              the main fire to start new spot fires. From orbit, satellites
              detect the heat that a fire gives off.
            </p>
          </div>
        </div>
      </section>

      <section className="diary section-pad">
        <div className="wrap">
          <div className="section-heading">
            <span className="eyebrow">A changing archive</span>
            <h2>The Wildfire Diary</h2>
          </div>
          <div className="diary-stage">
            <button
              className="round-control"
              onClick={() =>
                setSlide((slide + diary.length - 1) % diary.length)
              }
              aria-label="Previous wildfire story"
            >
              ←
            </button>
            <article className="diary-card featured">
              <img src={diary[slide].image} alt={diary[slide].place} />
              <div>
                <span>{diary[slide].date}</span>
                <h3>{diary[slide].place}</h3>
                <p>{diary[slide].note}</p>
              </div>
            </article>
            <article className="diary-card side-card">
              <img
                src={diary[(slide + 1) % diary.length].image}
                alt={diary[(slide + 1) % diary.length].place}
              />
              <div>
                <span>{diary[(slide + 1) % diary.length].date}</span>
                <h3>{diary[(slide + 1) % diary.length].place}</h3>
                <p>{diary[(slide + 1) % diary.length].note}</p>
              </div>
            </article>
            <button
              className="round-control"
              onClick={() => setSlide((slide + 1) % diary.length)}
              aria-label="Next wildfire story"
            >
              →
            </button>
          </div>
          <div className="pagination" aria-label="Current slide">
            {diary.map((item, index) => (
              <button
                key={item.place}
                className={slide === index ? "active" : ""}
                onClick={() => setSlide(index)}
                aria-label={`Show ${item.place}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="timeline section-pad">
        <div className="wrap data-grid">
          <div className="data-note">
            <span className="eyebrow light">Reading the economy</span>
            <h2>Overall Condition.</h2>
            <ul>
              <li>
                Financial Costs ($100B–$350B+
                Annually)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </li>
              <li>$106 billion in direct property Losses</li>
              <li>3% of tracked animals die directly</li>
              <li>200 to 500 direct deaths</li>
            </ul>
          </div>
          <div
            className="chart"
            aria-label="Illustration of fire activity over time"
          >
            <div className="chart-label">Observed fire activity</div>
            <div className="bars" aria-hidden="true">
              {[12, 40, 138, 112].map((height, index) => (
                <i
                  key={index}
                  style={{
                    height,
                    ...(index === 0 || index === 1 || index === 2 || index === 3
                      ? { position: "relative" }
                      : {}),
                  }}
                  title={
                    index === 0
                      ? "Animal deaths"
                      : index === 1
                        ? "Direct deaths"
                        : index === 2
                          ? "Financial loss"
                          : index === 3
                            ? "Property loss"
                            : undefined
                  }
                >
                  {index === 0 && (
                    <span className="bar-name">Animal deaths</span>
                  )}
                  {index === 1 && (
                    <span className="bar-name">Direct deaths</span>
                  )}
                  {index === 2 && (
                    <span className="bar-name">Financial loss</span>
                  )}
                  {index === 3 && (
                    <span className="bar-name">Property loss</span>
                  )}
                </i>
              ))}
            </div>
            <div className="chart-axis">
              <span>01</span>
              <span>05</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
            </div>
          </div>
        </div>
      </section>

      <section className="observation section-pad" id="observe">
        <div className="wrap">
          <div className="observation-head">
            <div>
              <span className="eyebrow coral">Live observation</span>
              <h2>Where the surface is changing now.</h2>
            </div>
            <p>MODIS and VIIRS thermal detections from NASA FIRMS, shown side by side.</p>
          </div>
          <HotspotMap />
        </div>
      </section>
      <BurningCalendar events={fireEvents} />
      <section className="about section-pad" id="about">
        <div className="wrap about-grid">
          <article className="earth-card">
            <img
              src={images.forest}
              alt="Smoke drifting over a forest canopy"
            />
            <div className="earth-card-copy">
              <span>Our earth in</span>
              <strong>the past years</strong>
            </div>
          </article>
          <article className="about-copy">
            <span className="eyebrow light">About the project</span>
            <h2>Look closer.</h2>
            <p>
              The Surface was built to make planetary change feel visible,
              specific, and human. We turn open climate data into concise visual
              stories that anyone can understand.
            </p>
            <p>
              Observation is where action begins. When we can see a pattern, we
              can ask better questions about what comes next.
            </p>
            <a href="#faq">Read common questions →</a>
          </article>
        </div>
      </section>

      <section className="faq section-pad" id="faq">
        <div className="wrap faq-grid">
          <div className="faq-title">
            <span>F</span>
            <span>A</span>
            <span>Q</span>
          </div>
          <div className="faq-list">
            <span className="eyebrow">Questions from the field</span>
            {faqs.map((faq, index) => (
              <article className="faq-item" key={faq.question}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {faq.question}
                  <i>{openFaq === index ? "−" : "+"}</i>
                </button>
                {openFaq === index && <p>{faq.answer}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="join section-pad" id="join">
        <div className="wrap join-grid">
          <div className="join-copy">
            <span className="eyebrow coral">Stay curious</span>
            <h2>
              Plan your day
              <br />
              with Surfie.
            </h2>
            <p>
              A short monthly field note on the signals changing our planet.
            </p>
            <button className="account-cta" onClick={openSignup}>
              Create an account <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="chat-card">
            {user && token ? (
              <Surfie user={user} token={token} onSessionExpired={logout} />
            ) : (
              <>
            <div className="chat-head">
              <span className="status-dot" />
              <strong>Surfie</strong>
              <span>online</span>
            </div>
            <p className="bubble surfie">
              Should I go for a walk this evening?
            </p>
            <p className="bubble reply">
              Air quality is good, with a cooler sunset around 7:42.
            </p>
            <form onSubmit={submitEmail}>
              <label htmlFor="email">Join the field notes</label>
              <div className="email-row">
                <input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  aria-label="Email address"
                />
                <button type="submit" aria-label="Subscribe">
                  →
                </button>
              </div>
              {subscribed && (
                <span className="success">You’re on the list. Welcome.</span>
              )}
            </form>
              </>
            )}
          </div>
        </div>
      </section>

      {showSignup && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowSignup(false)
          }}
        >
          <section
            className="signup-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-title"
          >
            <button
              className="modal-close"
              onClick={() => setShowSignup(false)}
              aria-label="Close account creation"
            >
              ×
            </button>
            {accountCreated ? (
              <div className="account-success">
                <span className="success-mark" aria-hidden="true">
                  ✓
                </span>
                <span className="eyebrow coral">Welcome aboard</span>
                <h2 id="signup-title">Your account is ready.</h2>
                <p>
                  You can now save field notes, follow observations, and receive
                  updates from The Surface.
                </p>
                <button onClick={() => setShowSignup(false)}>
                  Start exploring
                </button>
              </div>
            ) : (
              <>
                <span className="eyebrow coral">Join The Surface</span>
                <h2 id="signup-title">Create your account.</h2>
                <p className="signup-intro">
                  Save stories and build a personal view of our changing planet.
                </p>
                <form className="signup-form" onSubmit={createAccount}>
                  <label htmlFor="signup-name">Name</label>
                  <input
                    id="signup-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                  />
                  <label htmlFor="signup-email">Email address</label>
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@email.com"
                    required
                  />
                  <label htmlFor="signup-password">Password</label>
                  <input
                    id="signup-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    minLength={8}
                    required
                  />
                  <label htmlFor="signup-city">Your city</label>
                  <select id="signup-city" name="city" defaultValue="Dhaka" required>
                    {CITY_NAMES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <label className="terms">
                    <input type="checkbox" required />
                    <span>
                      I agree to the Terms of Use and acknowledge the Privacy
                      Policy.
                    </span>
                  </label>
                  {signupError && (
                    <p className="login-error" role="alert">
                      {signupError}
                    </p>
                  )}
                  <button className="signup-submit" type="submit" disabled={signupBusy}>
                    {signupBusy ? "Creating…" : "Create account"} <span aria-hidden="true">→</span>
                  </button>
                </form>
                <p className="signup-note">
                  Already a member?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setShowSignup(false)
                      setShowLogin(true)
                    }}
                  >
                    Sign in
                  </button>
                </p>
              </>
            )}
          </section>
        </div>
      )}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoggedIn={handleLoggedIn}
          onSwitchToSignup={() => {
            setShowLogin(false)
            openSignup()
          }}
        />
      )}

      <footer>
        <div className="wrap footer-grid">
          <div>
            <Brand light />
            <p>Stories from a changing planet.</p>
          </div>
          <div>
            <strong>Explore</strong>
            <a href="#story">Stories</a>
            <a href="#observe">Observations</a>
            <a href="#about">About</a>
            <a href="#/documents">Documents</a>
          </div>
          <div>
            <strong>Find us</strong>
            <a href="#home">Instagram</a>
            <a href="#home">Field notes</a>
            <a href="#home">Contact</a>
          </div>
          <div className="footer-note">
            <span>Based on open Earth data</span>
            <span>© 2026 The Surface</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App