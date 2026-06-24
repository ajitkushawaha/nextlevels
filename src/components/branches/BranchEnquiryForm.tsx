'use client'

import FreeCounsellingForm from '@/components/contact/FreeCounsellingForm'

type BranchEnquiryFormProps = {
  branchName: string
}

export default function BranchEnquiryForm({ branchName }: BranchEnquiryFormProps) {
  return (
    <div className="rounded-4xl bg-white p-4 text-[#081638] shadow-[0_15px_50px_rgba(8,22,56,0.08)] sm:p-5 lg:p-6">
      <FreeCounsellingForm
        heading={`Ready to Study Abroad from ${branchName}?`}
        description={`Send your details to the ${branchName} team and a counsellor will contact you.`}
        submitLabel={`Contact ${branchName} Branch`}
        image="/branch-form-student.png"
        imageAlt="Student pointing toward branch enquiry form"
        sourcePage={`${branchName} Branch`}
        sourceType="branch"
        sourceBranch={branchName}
      />
    </div>
  )
}
