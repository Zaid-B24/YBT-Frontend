import { motion } from "framer-motion";
import {
  FilterTabs,
  FilterTab,
  ActiveTabBackground,
} from "../../styles/EventStyles";

export const EventFilters = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <motion.div>
      <FilterTabs>
        {filters.map((filter) => (
          <FilterTab
            key={filter.key}
            active={activeFilter === filter.key}
            onClick={() => onFilterChange(filter.key)}
          >
            {activeFilter === filter.key && (
              <ActiveTabBackground
                layoutId="activeFilter"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {filter.label}
          </FilterTab>
        ))}
      </FilterTabs>
    </motion.div>
  );
};
