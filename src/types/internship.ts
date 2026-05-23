export interface Location {
  string: string;
  link: string;
  country: string;
  region: string | null;
  locationName: string;
  [key: string]: unknown;
}

export interface Stipend {
  salary: string;
  tooltip: string | null;
  salaryValue1: number;
  salaryValue2: number | null;
  salaryType: string;
  currency: string;
  scale: string;
  large_stipend_text: boolean;
  [key: string]: unknown;
}

export interface Internship {
  id: number;
  title: string;
  employment_type: string;
  company_name: string;
  company_url: string;
  is_premium: boolean;
  is_premium_internship: boolean;
  employer_name: string;
  company_logo: string;
  type: string;
  url: string;
  is_active: boolean;
  expires_at: string;
  closed_at: string;
  profile_name: string;
  part_time: boolean;
  start_date: string;
  duration: string;
  stipend: Stipend;
  posted_on: string;
  application_deadline: string;
  expiring_in: string;
  posted_by_label: string;
  posted_by_label_type: string;
  location_names: string[];
  locations: Location[];
  start_date1: string;
  start_date2: string;
  is_ppo: boolean;
  is_ppo_salary_disclosed: boolean;
  ppo_salary: string | null;
  ppo_salary2: string | null;
  ppo_label_value: string;
  to_show_extra_label: boolean;
  extra_label_value: string;
  is_extra_label_black: boolean;
  campaign_names: string[];
  campaign_name: string;
  to_show_in_search: boolean;
  campaign_url: string;
  labels_app: string;
  is_covid_wfh_selected: boolean;
  to_show_card_message: boolean;
  message: string;
  is_application_capping_enabled: boolean;
  application_capping_message: string;
  eligible_for_easy_apply: boolean;
  eligible_for_b2b_apply_now: boolean;
  to_show_b2b_label: boolean;
  is_international_job: boolean;
  to_show_cover_letter: boolean;
  office_days: string | null;
  work_from_home: boolean;
  application_status_message?: {
    to_show: boolean;
    message: string;
    type: string;
  };
  [key: string]: unknown;
}
