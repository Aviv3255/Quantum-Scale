'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, Check, ShieldX } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

const NEGATIVE_KEYWORDS = `$0, 101, abroad, academic, accessories, adapter, addresses, ads, adult, advice, affordable, afghanistan, aftermarket, agent, alaska, albania, algeria, alibaba, aliexpress, amazon, analysis, ancient, anonymous, antique, antiques, app, application, applications, applied, apprenticeships, archives, article, articles, assembly, assignment, associations, auction, auctions, authentic, average, b2b, back order, backordered, background, bad, bargain, bargains, basic, beginners, benchmark, benchmarks, benefits, best price, beta, bhutan, bid, bidding, biography, black friday, blog, blogs, blueprint, blueprints, bogo, book, books, borrow, boxes, brands, breakdown, broken, budget, build, builder, building, bulk, business, buy one get one, buying, california, campaign, canada, career, careers, case studies, case study, cash, cashback, catalog, catalogs, certification, certified, charity, cheap, cheapest, china, chromatography, circuits, cl, clarity, class, classes, classification, classified, classifieds, clearance, close out, closeout, club, code, codes, collection, college, colleges, colors, coming soon, commercial, community, companies, company, compare, comparison, comparisons, complaint, complementary, components, computer, concept, conference, conferences, connecticut, conservative, construction, consultant, consultants, consulting, consumer, contact, contractor, contractors, conversion, copies, copy, costing, coupon, coupons, course, courses, craigslist, create, creative, creator, credit, credit check, criteria, curriculum, custom, custom-made, cut, cut price, cyber monday, daily, damage, damaged, data, database, deal, deals, decrease, defective, deferred, definition, definitions, delaware, delivery, demo, demonstrate, demonstration, diagrams, dictionary, different, digital, diploma, directories, directory, dirt cheap, discontinued, discount, discounted, discounts, display, distant, distribution, distributor, distributors, diy, do it yourself, doctors, documentation, donate, donation, donations, download, downloads, drawings, drop ship, drop shipping, dropship, dropshipper, dropshipping, ebay, ebook, ebooks, economic, economy, education, educational, efficiency, elementary, email, employee, employment, encyclopedia, engine, equipment, error, estate, estimate, estimates, etsy, evaluation, exam, example, examples, exchange, exe, executive, experimental, experts, explain, export, exporter, exporters, fabric, factory, fake, faq, faqs, far, fashion, faulty, faux, facebook marketplace, feedback, fellowships, fiber, file, files, finance, financing, find, firmware, fix, flexible, florida, foreign, forum, forums, free, freebie, freebies, freelance, freight, furniture, gallery, game, games, garage, gear, general, georgia, giant, gift, gifts, giveaway, glass, global, gold, government, graduate, graphic, graphics, gratis, gray market, great deals, group, groups, guide, guidelines, guides, hack, hacks, hand made, handcrafted, handmade, hardware, hawaii, help, high end, hire, hiring, historical, history, home, homemade, homework, hospital, hospitals, hours, house, how to, howto, idaho, ideas, idle, illustration, illustrations, image, images, imitation, import, importer, importers, improve, improvement, inexpensive, info, information, initial, inspection, inspiration, install, installation, installment, installer, installers, institute, instruction, instructional, instructions, instructor, instructors, insurance, intelligence, interior, intern, internal, international, internship, internships, interview, interviews, inventory, investigation, investment, iowa, iron, issue, issues, item, items, ivory, japan, job, jobs, journal, journals, kansas, kentucky, kids, kit, kits, knock off, knock-off, knockoff, knowledge, label, labels, laboratory, landfills, laptop, large, law, laws, layaway, lead, leads, learn, learning, lease, leasing, legal, legislation, lesson, lessons, letters, level, libraries, library, license, licensing, life, light, limited offer, liquidation, list, listing, listings, literature, loan, loans, local, location, locations, login, logo, logos, long island, louisiana, low budget, low cost, low price, low priced, magazine, magazines, mailing, maine, maintenance, make, making, malfunction, management, manual, manuals, manufacture, manufacturer, manufacturers, manufacturing, map, maps, marked down, market, marketing, marketplace, maryland, massachusetts, material, materials, measurement, measurements, mechanical, media, medical, medicine, membership, memorabilia, merchant, merchants, metal, method, metrics, michigan, minnesota, mississippi, missouri, mock up, model, models, montana, monthly, movie, movies, museum, museums, music, name, nebraska, negative, neon, network, networks, nevada, new jersey, new mexico, new york, news, newsletter, newsletters, niche, no money down, nonprofit, north carolina, north dakota, nothing, novelty, oem, off price, offer, offers, ohio, oklahoma, old, online, open source, opening, openings, opinion, opinions, opportunity, options, orange, order, orders, oregon, organic, organization, organizations, original, out of stock, outlet, outlets, overhaul, overseas, overstock, packaging, paint, pallet, paper, part, parts, patch, patent, patents, path, patterns, pawn, pay, payment, pdf, pennsylvania, penny, performance, permit, permits, personal, phone, phone number, photo, photograph, photographs, photography, photos, pics, picture, pictures, planning, plastic, platform, platforms, plywood, podcast, podcasts, policy, poshmark, position, positions, post, postage, postal, poster, posters, power, practice, pre order, pre owned, pre-owned, precision, preliminary, preowned, press, preview, price break, price cut, price drop, price list, price match, prices, pricing, primary, print, printable, prints, private, pro, pro bono, problem, problems, process, professional, profile, profiles, profit, profits, program, programs, project, promo, promotion, promotional, promotions, prototype, provider, providers, public, publication, publications, purchase, quality, questionnaire, quick, quiz, quotation, quotations, quote, quotes, rate, rates, rating, ratings, ratio, raw, recalled, rebuild, rebuilding, rebate, rebates, recipe, recipes, reconditioned, record, records, recruit, recruiter, recruiting, recruitment, recycled, reddit, reduced price, reference, references, refurbished, refurbishing, refund, regional, registration, registry, regulation, regulations, rejected, release, remade, remote, rent, rent to own, rental, rentals, renting, repair, repairs, replace, replacement, replicas, report, reports, resale, research, researcher, researchers, reseller, resellers, resource, resources, restoration, restore, restructuring, results, resume, resumes, retail, retailers, return, returns, revenue, review, reviews, rhode island, risk, risks, rubber, rules, salaries, salary, sale, sales, salvage, sample, samples, savings, scanner, scholarships, school, schools, scrap, screensaver, screenshot, search, second hand, secondhand, security, sellers, seminar, seminars, sensor, service, services, setup, shein, shipping, show me, silver, simulators, site, sketch, sketches, slashed prices, slides, small, software, sold out, source, south carolina, south dakota, spare, spares, special offer, specifications, specs, ssi, staff, standards, state, statistics, stats, stock, storage, store, store hours, strategy, student, students, studies, study, style, styles, subscription, super, supplies, supply, support, surplus, survey, system, systems, table, target, taxes, teacher, teachers, teaching, team, technical, technique, techniques, technologies, technology, temu, template, templates, tennessee, terms, test, testing, texas, textbook, textbooks, theories, theory, thesis, thrift, tiny, tips, tools, top, torrent, torrents, total, toy, toys, trade, trademark, trader, traders, training, transparent, transport, travel, trial, trouble, troubleshoot, tutorial, tutorials, unavailable, university, used, utah, vacancy, value, vendor, vendors, vermont, versus, video, videos, vintage, virginia, virtual, vision, visual, volume, volunteer, volunteers, voucher, vouchers, vs, wall, wallpaper, walmart, warehouse, warranty, washington, wayfair, weight, west virginia, what are, what is, white paper, whitepaper, wholesale, wholesaler, wholesalers, wiki, wikipedia, wish, wisconsin, wood, work, working, workshop, workshops, worldwide, wyoming, yard, yellow pages, youtube, zero, zero percent, zip code`;

export default function GoogleNegativeKeywordsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(NEGATIVE_KEYWORDS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const keywordCount = NEGATIVE_KEYWORDS.split(',').length;

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        <header className="page-header">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
              <ShieldX className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1>Google Negative Keywords</h1>
              <p>Block junk traffic and save your ad budget</p>
            </div>
          </div>
        </header>

        <div className="max-w-4xl">
          {/* Hero message */}
          <div className="card mb-6 p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <h2 className="text-2xl font-bold mb-3">
              Cut 90% of Junk Traffic Instantly
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              These {keywordCount} negative keywords filter out bargain hunters, researchers, job seekers,
              and tire-kickers who will never buy. Stop paying for clicks that don&apos;t convert.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 bg-white/10 rounded-full">Google Ads</span>
              <span className="px-3 py-1 bg-white/10 rounded-full">Google Shopping</span>
              <span className="px-3 py-1 bg-white/10 rounded-full">Performance Max</span>
            </div>
          </div>

          {/* Keywords box */}
          <div className="card p-0 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-light)] bg-[var(--bg-secondary)]">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  Complete Negative Keywords List
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {keywordCount} keywords ready to paste
                </p>
              </div>
              <button
                onClick={handleCopy}
                className={`btn ${copied ? 'btn-primary' : 'btn-secondary'} flex items-center gap-2`}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy All
                  </>
                )}
              </button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-mono whitespace-pre-wrap break-words">
                {NEGATIVE_KEYWORDS}
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-6 bg-[var(--bg-secondary)] rounded-xl">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">How to Add These Keywords</h3>
            <ol className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><span className="font-medium text-[var(--text-primary)]">1.</span> Copy the keywords above</li>
              <li><span className="font-medium text-[var(--text-primary)]">2.</span> Go to Google Ads → Tools → Negative Keyword Lists</li>
              <li><span className="font-medium text-[var(--text-primary)]">3.</span> Create a new list and paste the keywords</li>
              <li><span className="font-medium text-[var(--text-primary)]">4.</span> Apply the list to all your campaigns</li>
            </ol>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
