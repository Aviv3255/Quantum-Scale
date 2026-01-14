'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, Check, Ban, TrendingDown, DollarSign, Target } from 'lucide-react';
import { motion } from 'framer-motion';
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
      setTimeout(() => setCopied(false), 2500);
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
  const keywordsArray = NEGATIVE_KEYWORDS.split(',').map(k => k.trim());

  return (
    <DashboardLayout>
      <div className="page-wrapper max-w-5xl">
        {/* Minimal Header */}
        <header className="mb-16">
          <p className="text-xs font-medium tracking-widest text-[var(--text-muted)] uppercase mb-3">
            Google Ads Optimization
          </p>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            Negative Keywords
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl">
            Stop wasting money on clicks that never convert. This curated list blocks
            bargain hunters, researchers, and tire-kickers from your campaigns.
          </p>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--bg-secondary)] mb-4">
              <Ban size={20} className="text-[var(--text-primary)]" />
            </div>
            <p className="text-3xl font-bold text-[var(--text-primary)]">{keywordCount}</p>
            <p className="text-sm text-[var(--text-muted)]">Keywords</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--bg-secondary)] mb-4">
              <TrendingDown size={20} className="text-[var(--text-primary)]" />
            </div>
            <p className="text-3xl font-bold text-[var(--text-primary)]">90%</p>
            <p className="text-sm text-[var(--text-muted)]">Less Junk Traffic</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--bg-secondary)] mb-4">
              <DollarSign size={20} className="text-[var(--text-primary)]" />
            </div>
            <p className="text-3xl font-bold text-[var(--text-primary)]">2-3x</p>
            <p className="text-sm text-[var(--text-muted)]">Better ROAS</p>
          </motion.div>
        </div>

        {/* Copy Button - Prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <button
            onClick={handleCopy}
            className={`w-full py-5 rounded-2xl text-base font-semibold transition-all flex items-center justify-center gap-3 ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]'
            }`}
          >
            {copied ? (
              <>
                <Check size={20} />
                Copied to Clipboard
              </>
            ) : (
              <>
                <Copy size={20} />
                Copy All {keywordCount} Keywords
              </>
            )}
          </button>
        </motion.div>

        {/* Keywords Display - Clean Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide">
              Preview
            </h2>
            <span className="text-xs text-[var(--text-muted)]">
              Scroll to see all
            </span>
          </div>
          <div className="max-h-64 overflow-y-auto rounded-2xl border border-[var(--border-light)] p-6 bg-white">
            <div className="flex flex-wrap gap-2">
              {keywordsArray.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-[var(--bg-secondary)] rounded-lg text-xs text-[var(--text-secondary)] font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* How to Use - Minimal Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide mb-8">
            How to Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Copy', desc: 'Click the button above' },
              { step: '02', title: 'Open Google Ads', desc: 'Tools → Negative Keywords' },
              { step: '03', title: 'Create List', desc: 'New list → Paste keywords' },
              { step: '04', title: 'Apply', desc: 'Add to all campaigns' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-light text-[var(--border-light)] mb-3">{item.step}</p>
                <p className="font-semibold text-[var(--text-primary)] mb-1">{item.title}</p>
                <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Compatible Platforms */}
        <div className="mt-16 pt-12 border-t border-[var(--border-light)]">
          <p className="text-xs text-[var(--text-muted)] text-center uppercase tracking-wide mb-6">
            Works with
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-[var(--text-muted)]">
            <span className="flex items-center gap-2">
              <Target size={16} />
              Google Ads
            </span>
            <span className="flex items-center gap-2">
              <Target size={16} />
              Google Shopping
            </span>
            <span className="flex items-center gap-2">
              <Target size={16} />
              Performance Max
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
