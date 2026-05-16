import { cva } from 'class-variance-authority';

export const headingVariants = cva('font-medium tracking-tight', {
  variants: {
    variant: {
      h2: 'text-3xl lg:text-4xl',
      h3: 'text-xl lg:text-2xl',
    },
  },
});

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium tracking-tight transition-all duration-200',
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-brand-foreground shadow-[0_10px_30px_rgba(37,99,235,0.18)] hover:bg-brand-200 hover:shadow-[0_16px_40px_rgba(37,99,235,0.28)]',
        secondary:
          'border border-slate-300/80 bg-white/85 text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:border-slate-400/80 hover:bg-white hover:shadow-[0_16px_40px_rgba(15,23,42,0.14)] dark:border-white/12 dark:bg-white/6 dark:text-slate-100 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:shadow-[0_16px_40px_rgba(2,6,23,0.34)]',
      },
      size: {
        default: 'rounded-full px-5 py-3 hover:-translate-y-0.5',
        compact: 'rounded-lg px-3.5 py-2 text-sm',
      },
      surface: {
        elevated: '',
        flat: 'shadow-none hover:translate-y-0 hover:shadow-none',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      surface: 'elevated',
    },
  },
);

export const cardVariants = cva('rounded-2xl text-sm p-6 bg-origin-border shadow-lg', {
  variants: {
    variant: {
      secondary: 'bg-brand-secondary text-brand-secondary-foreground',
      default: 'border bg-fd-card',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
