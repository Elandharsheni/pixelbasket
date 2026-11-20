import { useEffect, useState } from 'react'
import './App.css'

const services = [
  {
    number: '01',
    title: 'Logo Design & Branding',
    description:
      'Build a memorable identity that reflects what makes your business unique. We shape the visual foundations that help your brand look consistent and professional.',
    offerings: [
      'Custom logo design',
      'Brand identity creation',
      'Colour and typography selection',
      'Business branding',
      'Logo redesign',
    ],
  },
  {
    number: '02',
    title: 'Graphic Design',
    description:
      'Turn your message into polished visuals for print, promotions, and everyday business communication.',
    offerings: [
      'Posters and banners',
      'Pamphlets and flyers',
      'Brochures',
      'Business cards',
      'Invitations and promotional materials',
    ],
  },
  {
    number: '03',
    title: 'Social Media Design',
    description:
      'Show up with a consistent, eye-catching presence and creative content made to connect with your audience.',
    offerings: [
      'Instagram and Facebook posts',
      'Social media banners',
      'Promotional advertisements',
      'Festival and event creatives',
      'Product promotion designs',
    ],
  },
  {
    number: '04',
    title: 'Website Development',
    description:
      'Create a modern online home for your business with a clear message, responsive design, and a smooth experience across devices.',
    offerings: [
      'Business and portfolio websites',
      'E-commerce websites',
      'Landing pages',
      'Responsive website design',
      'Website redesign and maintenance',
    ],
  },
  {
    number: '05',
    title: 'Digital Branding Solutions',
    description:
      'Bring your brand together across digital channels with coordinated visuals and content that support your business goals.',
    offerings: [
      'Complete brand identity packages',
      'Digital marketing creatives',
      'Product and business promotions',
      'Visual content creation',
    ],
  },
]

const audiences = [
  'Small businesses and local shops',
  'Startups and entrepreneurs',
  'Restaurants and cafes',
  'Fashion and clothing brands',
  'Beauty salons and boutiques',
  'Educational institutions',
  'Freelancers and personal brands',
  'Event organisers',
]

const reasons = [
  {
    title: 'Creative and unique',
    description: 'Thoughtful visuals shaped around your business, audience, and goals.',
  },
  {
    title: 'Affordable and professional',
    description: 'High-quality creative work with practical solutions for businesses at every stage.',
  },
  {
    title: 'Customer-focused',
    description: 'A collaborative process that keeps your ideas and priorities at the centre.',
  },
  {
    title: 'Everything under one roof',
    description: 'Branding, graphic design, social creatives, and website development in one place.',
  },
]

const projectStages = ['Request received', 'In progress', 'Review', 'Completed']

const initialProjects = [
  {
    id: 'PB-1048',
    customer: 'Alex Morgan',
    title: 'Northstar Coffee brand identity',
    service: 'Logo Design & Branding',
    dueDate: 'Nov 24, 2026',
    status: 'In progress',
  },
  {
    id: 'PB-1032',
    customer: 'Alex Morgan',
    title: 'Holiday menu and social creatives',
    service: 'Social Media Design',
    dueDate: 'Nov 18, 2026',
    status: 'Review',
  },
  {
    id: 'PB-1021',
    customer: 'Jordan Lee',
    title: 'Studio website refresh',
    service: 'Website Development',
    dueDate: 'Nov 20, 2026',
    status: 'Request received',
  },
]

const projectsStorageKey = 'pixelbasket-projects-v1'

function readProjects() {
  try {
    const savedProjects = window.localStorage.getItem(projectsStorageKey)
    return savedProjects ? JSON.parse(savedProjects) : initialProjects
  } catch {
    return initialProjects
  }
}

function App() {
  const [dashboardView, setDashboardView] = useState('customer')
  const [projects, setProjects] = useState(readProjects)
  const [requestMessage, setRequestMessage] = useState('')
  const [lastUpdated, setLastUpdated] = useState(() => new Date())

  useEffect(() => {
    const syncProjects = (event) => {
      if (event.key === projectsStorageKey && event.newValue) {
        try {
          setProjects(JSON.parse(event.newValue))
          setLastUpdated(new Date())
        } catch {
          // Ignore an incomplete value while another tab is writing.
        }
      }
    }
    window.addEventListener('storage', syncProjects)
    return () => window.removeEventListener('storage', syncProjects)
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(projectsStorageKey, JSON.stringify(projects))
      setLastUpdated(new Date())
    } catch {
      // The workspace remains usable if browser storage is unavailable.
    }
  }, [projects])

  const customerProjects = projects.filter((project) => project.customer === 'Alex Morgan')
  const updateProjectStatus = (projectId, status) => {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId ? { ...project, status } : project,
      ),
    )
  }

  const requestService = (service) => {
    const projectId = `PB-${Date.now()}`
    setProjects((currentProjects) => [
      {
        id: projectId,
        customer: 'Alex Morgan',
        title: `${service.title} project`,
        service: service.title,
        dueDate: 'To be confirmed',
        status: 'Request received',
      },
      ...currentProjects,
    ])
    setRequestMessage(`${service.title} request added. Your project list is up to date.`)
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <a href="#home" className="brand" aria-label="PixelBasket home">
          <img
            className="brand-logo"
            src="/pixelbasket-logo.png"
            alt="PixelBasket — We Create. You Grow."
            width="240"
            height="180"
          />
        </a>

        <nav className="nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#portal">Workspace</a>
          <a href="#clients">Who we serve</a>
        </nav>

        <div className="topbar-actions">
          <a className="btn btn-primary" href="mailto:hello@pixelbasket.studio">
            Let’s talk
          </a>
        </div>
      </header>

      <main id="home">
        <section id="overview" className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">Creative digital agency</p>
            <h1>Your ideas. Our creativity. Endless possibilities.</h1>
            <p className="hero-tagline">We Create. You Grow.</p>
            <p className="lede">
              At PixelBasket, we turn business ideas into creative designs and powerful digital
              experiences. From your first logo to a complete online presence, we help your brand
              make a lasting impression.
            </p>

            <div className="cta-row">
              <a className="btn btn-primary" href="#services">
                Explore our services
              </a>
              <a className="btn btn-secondary" href="#about">
                Get to know us
              </a>
            </div>

            <ul className="mini-list" aria-label="Our core services">
              <li>Branding</li>
              <li>Graphic design</li>
              <li>Websites</li>
            </ul>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="glow glow-one" />
            <div className="glow glow-two" />
            <div className="creative-preview">
              <span className="preview-label">A brand starts with an idea</span>
              <div className="preview-art">
                <span className="preview-orbit orbit-one" />
                <span className="preview-orbit orbit-two" />
                <span className="preview-spark">✦</span>
                <span className="preview-letter">P</span>
              </div>
              <div className="preview-caption">
                <strong>Make it memorable.</strong>
                <span>Design · Digital · Growth</span>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="section-heading">
            <p className="eyebrow">About PixelBasket</p>
            <h2>Creative thinking, thoughtful design, and technology working together.</h2>
          </div>
          <div className="about-copy">
            <p>
              PixelBasket is a creative digital agency that helps small businesses, startups,
              entrepreneurs, and established brands build a strong brand identity and digital
              presence. We bring creativity, design, and technology together to transform business
              ideas into professional visual identities and digital experiences.
            </p>
            <p>
              From designing attractive logos and promotional materials to developing modern,
              responsive websites, we provide complete creative and digital solutions under one
              roof. Our mission is to help businesses stand out, connect with their customers, and
              grow in the digital world through innovative, affordable, and high-quality services.
            </p>
          </div>
        </section>

        <section id="services" className="section services-offer">
          <div className="section-heading">
            <p className="eyebrow">What we do</p>
            <h2>Everything you need to build a brand and bring it to the world.</h2>
            <p className="section-intro">
              Whether you’re launching something new or ready to grow, we bring your creative and
              digital needs together in one place.
            </p>
          </div>

          <div className="offer-grid">
            {services.map((service) => (
              <article key={service.number} className="offer-card">
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-list">
                  {service.offerings.map((offering) => (
                    <li key={offering}>{offering}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="portal" className="section portal-section">
          <div className="portal-heading">
            <div className="section-heading">
              <p className="eyebrow">PixelBasket workspace</p>
              <h2>One place to keep every project moving.</h2>
              <p className="section-intro">
                Follow your creative work from brief to delivery, or manage incoming projects as an
                administrator.
              </p>
              <p className="dashboard-note">Changes save automatically in this browser and sync across open tabs · Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
            </div>
            <div className="view-switch" role="group" aria-label="Choose dashboard view">
              <button
                className={dashboardView === 'customer' ? 'view-switch-active' : ''}
                type="button"
                aria-pressed={dashboardView === 'customer'}
                onClick={() => setDashboardView('customer')}
              >
                Customer view
              </button>
              <button
                className={dashboardView === 'admin' ? 'view-switch-active' : ''}
                type="button"
                aria-pressed={dashboardView === 'admin'}
                onClick={() => setDashboardView('admin')}
              >
                Admin view
              </button>
            </div>
          </div>

          {dashboardView === 'customer' ? (
            <div className="portal-panel">
              <div className="portal-welcome">
                <div>
                  <p className="portal-kicker">CUSTOMER DASHBOARD</p>
                  <h3>Good to see you, Alex.</h3>
                  <p>Here’s the latest on the work you’ve shared with us.</p>
                </div>
                <div className="portal-summary" aria-label={`${customerProjects.length} active projects`}>
                  <strong>{customerProjects.length}</strong>
                  <span>Your projects</span>
                </div>
              </div>

              {requestMessage && (
                <p className="request-message" role="status">
                  {requestMessage}
                </p>
              )}

              <div className="portal-content-grid">
                <section className="portal-subsection" aria-labelledby="project-tracking-title">
                  <div className="portal-section-title">
                    <div>
                      <p className="portal-kicker">IN PROGRESS</p>
                      <h4 id="project-tracking-title">Your projects</h4>
                    </div>
                    <span>{customerProjects.length} total</span>
                  </div>
                  <div className="customer-project-list">
                    {customerProjects.map((project) => {
                      const stageIndex = projectStages.indexOf(project.status)
                      const progress = ((stageIndex + 1) / projectStages.length) * 100

                      return (
                        <article className="customer-project-card" key={project.id}>
                          <div className="customer-project-top">
                            <span className="project-id">{project.id}</span>
                            <span className={`status-badge status-${stageIndex}`}>
                              {project.status}
                            </span>
                          </div>
                          <h5>{project.title}</h5>
                          <p>{project.service}</p>
                          <div
                            className="project-progress"
                            role="progressbar"
                            aria-label={`${project.title} progress`}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            aria-valuenow={progress}
                          >
                            <span style={{ width: `${progress}%` }} />
                          </div>
                          <div className="project-progress-meta">
                            <span>{project.status}</span>
                            <span>Due {project.dueDate}</span>
                          </div>
                        </article>
                      )
                    })}
                    {customerProjects.length === 0 && (
                      <p className="empty-projects">
                        No projects yet. Explore the service catalog to get started.
                      </p>
                    )}
                  </div>
                </section>

                <section className="portal-subsection catalog-subsection" aria-labelledby="catalog-title">
                  <div className="portal-section-title">
                    <div>
                      <p className="portal-kicker">MADE FOR YOUR NEXT IDEA</p>
                      <h4 id="catalog-title">Service catalog</h4>
                    </div>
                  </div>
                  <div className="catalog-list">
                    {services.map((service) => (
                      <article className="catalog-item" key={service.number}>
                        <div>
                          <span className="catalog-number">{service.number}</span>
                          <h5>{service.title}</h5>
                          <p>{service.description}</p>
                        </div>
                        <button
                          className="catalog-request"
                          type="button"
                          onClick={() => requestService(service)}
                        >
                          Request service <span aria-hidden="true">↗</span>
                        </button>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <div className="portal-panel">
              <div className="portal-welcome">
                <div>
                  <p className="portal-kicker">ADMIN DASHBOARD</p>
                  <h3>Project overview</h3>
                  <p>Review incoming work and keep each customer up to date.</p>
                </div>
                <div className="admin-summary">
                  <div>
                    <strong>{projects.length}</strong>
                    <span>Total projects</span>
                  </div>
                  <div>
                    <strong>{projects.filter((project) => project.status === 'Request received').length}</strong>
                    <span>New requests</span>
                  </div>
                  <div>
                    <strong>{projects.filter((project) => project.status === 'Completed').length}</strong>
                    <span>Completed</span>
                  </div>
                </div>
              </div>

              <section className="admin-projects" aria-labelledby="admin-projects-title">
                <div className="portal-section-title">
                  <div>
                    <p className="portal-kicker">WORK QUEUE</p>
                    <h4 id="admin-projects-title">Customer projects</h4>
                  </div>
                  <span>Updates are reflected in the customer dashboard.</span>
                </div>
                <div className="project-table-wrap">
                  <table className="project-table">
                    <thead>
                      <tr>
                        <th scope="col">Project</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Service</th>
                        <th scope="col">Due date</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id}>
                          <td>
                            <strong>{project.title}</strong>
                            <span className="project-id">{project.id}</span>
                          </td>
                          <td>{project.customer}</td>
                          <td>{project.service}</td>
                          <td>{project.dueDate}</td>
                          <td>
                            <label className="status-control">
                              <span className="visually-hidden">Status for {project.title}</span>
                              <select
                                value={project.status}
                                onChange={(event) =>
                                  updateProjectStatus(project.id, event.target.value)
                                }
                              >
                                {projectStages.map((stage) => (
                                  <option key={stage} value={stage}>
                                    {stage}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}
        </section>

        <section id="clients" className="section audience-section">
          <div className="section-heading">
            <p className="eyebrow">Who we serve</p>
            <h2>Good ideas deserve a brand that feels like you.</h2>
            <p className="section-intro">
              We work with people and teams who are ready to make their next idea real—from local
              businesses to growing brands.
            </p>
          </div>
          <ul className="audience-list">
            {audiences.map((audience) => (
              <li key={audience}>{audience}</li>
            ))}
          </ul>
        </section>

        <section className="section features">
          <div className="section-heading">
            <p className="eyebrow">Why PixelBasket</p>
            <h2>Creative support that makes growing your business feel simpler.</h2>
          </div>
          <div className="feature-grid">
            {reasons.map((reason) => (
              <article key={reason.title} className="feature-card">
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section vision-section">
          <div className="vision-copy">
            <p className="eyebrow">Our vision</p>
            <h2>Helping brands grow with confidence.</h2>
            <p>
              We aim to become a trusted creative digital partner for businesses—delivering
              innovative designs and digital solutions that help brands grow and succeed.
            </p>
          </div>
          <a className="btn btn-primary" href="mailto:hello@pixelbasket.studio">
            Start a conversation
          </a>
        </section>
      </main>

      <footer id="contact" className="site-footer">
        <div>
          <strong>PixelBasket</strong>
          <span>We Create. You Grow.</span>
        </div>
        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="mailto:hello@pixelbasket.studio">hello@pixelbasket.studio</a>
        </div>
      </footer>
    </div>
  )
}

export default App
