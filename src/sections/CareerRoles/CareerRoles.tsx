// CareerRoles.tsx — filterable open roles board
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  Layers,
  MapPin,
  PenTool,
  Search,
  ServerCog,
  X,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/common/Section";
import { Container } from "@/components/common/Container";
import { GradientText } from "@/components/common/GradientText";
import { BackgroundDecor } from "@/components/common/BackgroundDecor";
import { CornerDots } from "@/components/common/CornerDots";
import { blurUp, staggerContainer } from "@/constants/motion";
import { cn } from "@/utils/cn";
import styles from "./CareerRoles.module.css";

const containerVariants = staggerContainer(0.06);

const itemVariants = blurUp(20, 0.5, 8);

type Team = "Engineering" | "Design" | "Product" | "Operations";

interface Role {
  title: string;
  team: Team;
  location: string;
  icon: LucideIcon;
  accent: string;
}

const ROLES: Role[] = [
  {
    title: "Senior Frontend Engineer",
    team: "Engineering",
    location: "Remote",
    icon: Code2,
    accent: "team-blue",
  },
  {
    title: "AI / ML Engineer",
    team: "Engineering",
    location: "Remote",
    icon: Code2,
    accent: "team-blue",
  },
  {
    title: "Backend Engineer (Go / Python)",
    team: "Engineering",
    location: "Bengaluru",
    icon: Code2,
    accent: "team-blue",
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "Remote",
    icon: PenTool,
    accent: "team-violet",
  },
  {
    title: "Design Systems Lead",
    team: "Design",
    location: "Remote",
    icon: PenTool,
    accent: "team-violet",
  },
  {
    title: "Product Manager",
    team: "Product",
    location: "Remote",
    icon: Layers,
    accent: "team-amber",
  },
  {
    title: "Developer Advocate",
    team: "Product",
    location: "Remote",
    icon: Layers,
    accent: "team-amber",
  },
  {
    title: "DevOps Engineer",
    team: "Operations",
    location: "Remote",
    icon: ServerCog,
    accent: "team-teal",
  },
];

const TEAMS = [...new Set(ROLES.map((role) => role.team))];
const LOCATIONS = [...new Set(ROLES.map((role) => role.location))];

type DropdownKey = "team" | "location" | null;

interface DropdownProps<T extends string> {
  label: string;
  options: readonly T[];
  selected: T[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: T) => void;
}

function Dropdown<T extends string>({
  label,
  options,
  selected,
  isOpen,
  onToggle,
  onSelect,
}: DropdownProps<T>) {
  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        className={cn(
          styles.dropdownTrigger,
          isOpen && styles.dropdownTriggerOpen,
        )}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {label}
        {selected.length > 0 && (
          <span className={styles.dropdownCount}>{selected.length}</span>
        )}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={cn(styles.chevron, isOpen && styles.chevronOpen)}
        />
      </button>

      {isOpen && (
        <div
          className={styles.dropdownPanel}
          role="listbox"
          aria-multiselectable="true"
        >
          {options.map((option) => {
            const checked = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={checked}
                className={cn(
                  styles.dropdownItem,
                  checked && styles.dropdownItemActive,
                )}
                onClick={() => onSelect(option)}
              >
                <span
                  className={cn(styles.checkbox, checked && styles.checkboxOn)}
                >
                  {checked && <Check size={12} aria-hidden="true" />}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function CareerRoles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  const [search, setSearch] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        filterBarRef.current &&
        !filterBarRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleTeam = (team: Team) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team],
    );
    setPage(1);
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location],
    );
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const clearAll = () => {
    setSearch("");
    setSelectedTeams([]);
    setSelectedLocations([]);
    setPage(1);
  };

  const visibleRoles = useMemo(() => {
    const query = search.trim().toLowerCase();
    return ROLES.filter((role) => {
      const matchesSearch =
        query.length === 0 || role.title.toLowerCase().includes(query);
      const matchesTeam =
        selectedTeams.length === 0 || selectedTeams.includes(role.team);
      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(role.location);
      return matchesSearch && matchesTeam && matchesLocation;
    });
  }, [search, selectedTeams, selectedLocations]);

  const hasActiveFilters =
    selectedTeams.length > 0 ||
    selectedLocations.length > 0 ||
    search.trim().length > 0;

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(visibleRoles.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedRoles = visibleRoles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <Section className={styles.root} id="open-roles">
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="left" />
        <CornerDots corner="right" />
      </BackgroundDecor>

      <Container maxWidth="wide" className={styles.container} ref={sectionRef}>
        {/* ---------- Header ---------- */}
        <motion.div
          className={styles.header}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span className={styles.eyebrowLabel} variants={itemVariants}>
            Open Roles
          </motion.span>
          <motion.h2 className={styles.title} variants={itemVariants}>
            Find your <GradientText>lane</GradientText>
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            Eight roles across four teams. Pick a lane or read them all — the
            tea is always hot.
          </motion.p>
        </motion.div>

        {/* ---------- Filter bar ---------- */}
        <motion.div
          ref={filterBarRef}
          className={styles.filterBar}
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <label className={styles.searchBox}>
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search by role…"
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
            />
          </label>

          <Dropdown
            label="Department"
            options={TEAMS}
            selected={selectedTeams}
            isOpen={openDropdown === "team"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "team" ? null : "team")
            }
            onSelect={toggleTeam}
          />

          <Dropdown
            label="Location"
            options={LOCATIONS}
            selected={selectedLocations}
            isOpen={openDropdown === "location"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "location" ? null : "location")
            }
            onSelect={toggleLocation}
          />

          <span className={styles.resultCount}>
            {visibleRoles.length} of {ROLES.length} roles
          </span>
        </motion.div>

        {/* ---------- Active filter chips ---------- */}
        {hasActiveFilters && (
          <motion.div
            className={styles.activeChips}
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {selectedTeams.map((team) => (
              <span key={team} className={styles.chip}>
                {team}
                <button
                  type="button"
                  aria-label={`Remove ${team}`}
                  onClick={() => toggleTeam(team)}
                >
                  <X size={12} aria-hidden="true" />
                </button>
              </span>
            ))}
            {selectedLocations.map((location) => (
              <span key={location} className={styles.chip}>
                <MapPin size={12} aria-hidden="true" />
                {location}
                <button
                  type="button"
                  aria-label={`Remove ${location}`}
                  onClick={() => toggleLocation(location)}
                >
                  <X size={12} aria-hidden="true" />
                </button>
              </span>
            ))}
            <button
              type="button"
              className={styles.clearAll}
              onClick={clearAll}
            >
              Clear all
            </button>
          </motion.div>
        )}

        {/* ---------- Role board ---------- */}
        <motion.div
          className={styles.board}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {paginatedRoles.map((role) => (
            <motion.a
              key={role.title}
              href={`mailto:careers@metadev.com?subject=Application: ${role.title}`}
              className={cn(styles.role, styles[role.accent])}
              variants={itemVariants}
              layout
            >
              <span className={styles.roleBar} />
              <span className={styles.roleTop}>
                <span className={styles.roleIcon}>
                  <role.icon size={20} aria-hidden="true" />
                </span>
                <span className={styles.roleApply}>
                  Apply
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </span>
              <span className={styles.roleInfo}>
                <span className={styles.roleTitle}>{role.title}</span>
                <span className={styles.roleMeta}>
                  <span className={styles.roleTag}>{role.team}</span>
                  <span className={styles.roleLocation}>
                    <MapPin size={12} aria-hidden="true" />
                    {role.location}
                  </span>
                  <span className={styles.roleOpen}>
                    <span className={styles.roleOpenDot} />
                    Open
                  </span>
                </span>
              </span>
            </motion.a>
          ))}

          {visibleRoles.length === 0 && (
            <motion.div className={styles.empty} variants={itemVariants}>
              <p className={styles.emptyTitle}>No roles match your filters.</p>
              <p className={styles.emptyHint}>
                Try a different search term or clear the filters.
              </p>
              <button
                type="button"
                className={styles.emptyClear}
                onClick={clearAll}
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* ---------- Pagination ---------- */}
        {totalPages > 1 && (
          <motion.nav
            className={styles.pagination}
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            aria-label="Role pages"
          >
            <button
              type="button"
              className={styles.pageBtn}
              onClick={() => setPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={15} aria-hidden="true" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (number) => (
                <button
                  key={number}
                  type="button"
                  className={cn(
                    styles.pageBtn,
                    styles.pageNum,
                    number === currentPage && styles.pageNumActive,
                  )}
                  onClick={() => setPage(number)}
                  aria-current={number === currentPage ? "page" : undefined}
                >
                  {number}
                </button>
              ),
            )}

            <button
              type="button"
              className={styles.pageBtn}
              onClick={() => setPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={15} aria-hidden="true" />
            </button>
          </motion.nav>
        )}
      </Container>
    </Section>
  );
}

export default CareerRoles;
