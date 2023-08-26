var documenterSearchIndex = {"docs":
[{"location":"#P.H.A.J.","page":"P.H.A.J.","title":"P.H.A.J.","text":"","category":"section"},{"location":"#Index","page":"P.H.A.J.","title":"Index","text":"","category":"section"},{"location":"","page":"P.H.A.J.","title":"P.H.A.J.","text":"","category":"page"},{"location":"#Functions","page":"P.H.A.J.","title":"Functions","text":"","category":"section"},{"location":"","page":"P.H.A.J.","title":"P.H.A.J.","text":"Documentation for Phaj.jl","category":"page"},{"location":"","page":"P.H.A.J.","title":"P.H.A.J.","text":"nn_params\r\nRegion\r\nprogress_bar_update\r\nprpy_sequence\r\nsequence_thermodynamic_sum\r\ngc_content\r\nsortbyrank\r\nbuild_suffix_array\r\nbuild_longest_common_prefix\r\nfind_homodimers\r\nfilter_probes\r\ncheck_probe_tm\r\nslice_probe\r\ncalculate_thermodynamic_parameters\r\nlongest_aligned_region!\r\nprobe_tm_salt_correction\r\nparse_commandline","category":"page"},{"location":"#Phaj.nn_params","page":"P.H.A.J.","title":"Phaj.nn_params","text":"nn_params\n\nA structure encapsulating the thermodynamic parameters for DNA nearest-neighbor (NN) interactions. \n\nThe values are based on SantaLucia's 1997 paper titled  \"Thermodynamics and NMR of internal G·T mismatches in DNA.\"  DOI.\n\nParameters\n\nThe struct contains entropy (ΔS, in cal/mol·K) and enthalpy (ΔH, in kcal/mol) values for  each of the NN pairs:\n\nNN Pair ΔS ΔH\nAA delta_s delta_h\nAC delta_s delta_h\nAG delta_s delta_h\nAT delta_s delta_h\nCA delta_s delta_h\nCC delta_s delta_h\nCG delta_s delta_h\nGA delta_s delta_h\nGC delta_s delta_h\nTA delta_s delta_h\n\nNotes\n\nThis struct is essential for functions aiming to compute the thermodynamics of DNA sequences  or structures.\n\n\n\n\n\n","category":"type"},{"location":"#Phaj.Region","page":"P.H.A.J.","title":"Phaj.Region","text":"mutable struct Region\n    start::Int\n    stop::Int\nend\n\nA mutable structure that represents a region in a sequence. start and stop are the  1-based indices of the start and end of the region, respectively.\n\n\n\n\n\n","category":"type"},{"location":"#Phaj.progress_bar_update","page":"P.H.A.J.","title":"Phaj.progress_bar_update","text":"Update progress bar on the command line.\n\n\n\n\n\n","category":"function"},{"location":"#Phaj.prpy_sequence","page":"P.H.A.J.","title":"Phaj.prpy_sequence","text":"prpy_sequence(sequence::AbstractString)::String\n\nConvert a given DNA sequence into purine (A/G represented by 'R')  and pyrimidine (C/T represented by 'Y') codes.\n\nArguments\n\nsequence::AbstractString: A DNA sequence containing nucleotide bases.\n\nReturns\n\nA string where purines are replaced with 'R' and pyrimidines with 'Y'.\n\n\n\n\n\n","category":"function"},{"location":"#Phaj.sequence_thermodynamic_sum","page":"P.H.A.J.","title":"Phaj.sequence_thermodynamic_sum","text":"sequence_thermodynamic_sum(delta_h::Vector{Float64}\n                            , delta_s::Vector{Float64}\n                            , nn_pairs_list::Vector{String}\n                            , sequence_nn_list::Vector{String}\n                            )\n\nCalculate the total enthalpy and entropy of each sequence.\n\nArguments\n\ndelta_h::Vector{Float64}: A vector containing enthalpy values for nearest-neighbor pairs.\ndelta_s::Vector{Float64}: A vector containing entropy values for nearest-neighbor pairs.\nnn_pairs_list::Vector{String}: A vector containing nearest-neighbor pairs.\nsequence_nn_list: A list of nearest-neighbor pairs for the given sequence.\n\nReturns\n\nTotal enthalpy and entropy for the sequence.\n\n\n\n\n\n","category":"function"},{"location":"#Phaj.gc_content","page":"P.H.A.J.","title":"Phaj.gc_content","text":"gc_content(sequence::LongSequence{DNAAlphabet{4}})::Float64\n\nCalculate the GC content of a given DNA sequence.\n\nArguments\n\nsequence::LongSequence{DNAAlphabet{4}}: A DNA sequence containing nucleotide bases.\n\nReturns\n\nThe percentage of G and C bases in the given sequence.\n\n\n\n\n\n","category":"function"},{"location":"#Phaj.sortbyrank","page":"P.H.A.J.","title":"Phaj.sortbyrank","text":"sortbyrank(i::Int, j::Int, rank::Vector{Int}, k::Int, len::Int) -> Bool\n\nDetermine the ordering of two indices in the suffix array based on their ranks.\n\nThis function is crucial in the construction of the suffix array. It provides a means  to compare two suffixes in the sequence. Initially, the comparison is done based on  the individual characters. As the algorithm progresses and the ranks evolve (becoming  more refined), the comparison can consider characters further down the sequence.\n\nArguments\n\ni::Int: The starting index of the first suffix in the sequence.\nj::Int: The starting index of the second suffix in the sequence.\nrank::Vector{Int}: The rank array corresponding to the current state of suffixes.\nk::Int: The offset used to look-ahead in the rank comparisons.\nlen::Int: The length of the sequence.\n\nReturns\n\nBool: true if the suffix starting at i comes before the suffix starting at j, false otherwise.\n\nNotes\n\nThe function considers not just the current rank but also the rank of the characters  k positions ahead in the sequence. This is to ensure the correct ordering of suffixes  that may start with the same characters.\n\n\n\n\n\n","category":"function"},{"location":"#Phaj.build_suffix_array","page":"P.H.A.J.","title":"Phaj.build_suffix_array","text":"build_suffix_array(sequence::String) -> Vector{Int}\n\nBuild a suffix array for a given sequence.\n\nArguments\n\nsequence::String: A DNA sequence string.\n\nReturns\n\nA Vector{Int} representing the suffix array of the sequence.\n\nExplanation\n\nThe suffix array construction algorithm uses a double-sorting technique based on  ranks of characters and their next 'k' characters. These ranks are updated in each  iteration to reflect the combined ranks of two consecutive substrings of length 'k'.\n\n\n\n\n\n","category":"function"},{"location":"#Phaj.build_longest_common_prefix","page":"P.H.A.J.","title":"Phaj.build_longest_common_prefix","text":"build_longest_common_prefix(sequence::String, suffix_array::Vector{Int}) -> Vector{Int}\n\nBuild the Longest Common Prefix (LCP) array from a sequence and its suffix array.\n\nArguments\n\nsequence::String: A DNA sequence string.\nsuffix_array::Vector{Int}: The suffix array of the sequence.\n\nReturns\n\nA Vector{Int} representing the LCP array of the sequence.\n\nExplanation\n\nThe LCP array indicates the number of characters two consecutive suffixes in the  suffix array have in common.\n\n\n\n\n\n","category":"function"},{"location":"#Phaj.find_homodimers","page":"P.H.A.J.","title":"Phaj.find_homodimers","text":"find_homodimers(sequence::String) -> Vector{String}\n\nIdentify all homodimers in a given DNA sequence using a suffix array and LCP array.\n\nArguments\n\nsequence::String: A DNA sequence string.\n\nReturns\n\nA Vector{String} containing all identified homodimers in the sequence.\n\nExplanation\n\nThis function aims to identify regions in the provided DNA sequence where the sequence  is its own complement, known as homodimers. To do this, the sequence is combined with  its reverse complement. The reason for using the reverse complement (rather than the  simple complement) is that DNA naturally binds in an antiparallel fashion. In other  words, when looking for a region in the sequence that can form a homodimer (with itself),  it is the reverse complement of a subsequence that will align with and bind to that subsequence.\n\nIt then checks the LCP values to identify overlapping regions between the original  sequence and its complement, which indicate homodimers.\n\n\n\n\n\n","category":"function"},{"location":"#Phaj.filter_probes","page":"P.H.A.J.","title":"Phaj.filter_probes","text":"filter_probes(probes::Vector{String}\n                , temperature_threshold::Integer\n                , monovalent::Float64\n                , mg::Float64\n                , dntps::Float64\n                , oligo_conc::Float64\n                , delta_g_threshold::Float64\n                , upper_gc::Float64\n                , lower_gc::Float64\n                , max_aligned_length::Integer\n                , max_heterodimer_tm::Integer\n                )\n\nFilter probes based on the adjusted melting temperature with respect to a temperature threshold.  Calculates the adjusted melting temperature for pairs of sequences and returns those sequences  with temperatures below the given threshold. Additionally, calculates and returns Gibbs free energy  for the aligned region of each sequence pair.\n\nArguments\n\nprobes::Vector{String}: A vector of DNA sequences (probes) to be filtered.\ntemperature_threshold::Integer: A temperature threshold (in Celsius) to filter the probes.\nmonovalent::Int64: Concentration of monovalent ions in mM.\nmg::Float64: Concentration of magnesium ions in mM.\ndntps::Float64: Concentration of dNTPs in mM.\noligo_c::Float64: Oligo concentration in μM.\ndelta_g_threshold::Float64: Delta G threshold for homodimer sequences in kcal/mol.\nupper_gc::Float64: Upper bound for cutoff based on percent GC, range 0-1.0.\nlower_gc::Float64: Lower bound for cutoff based on percent GC, range 0-1.0.\nmax_aligned_length::Integer: Maximum length of complementary bps a probe can have with other probes.\nmax_heterodimer_tm::Integer: Maximum melting temperature a stretch of heterodimer bases can have \n\nwith another probe.\n\nReturns\n\npromising_probes: A set of sequences with adjusted melting temperatures below the temperature threshold.\n\nNotes\n\nThe function considers various thermodynamic and environmental parameters, such as mono- and divalent ion concentrations,  to calculate adjusted melting temperatures and Gibbs free energy for each sequence pair.\n\n\n\n\n\n","category":"function"},{"location":"#Phaj.check_probe_tm","page":"P.H.A.J.","title":"Phaj.check_probe_tm","text":"check_probe_tm(probe::String\n                , temperature_threshold::Integer\n                , monovalent::Float64\n                , nn::nn_params\n                , oligo_c::Float64\n                , dntps::Float64\n                , mg::Float64\n                )\n\nCheck if all slices of a DNA probe sequence have melting temperatures (Tm) above a  set threshold. The function splits the probe into roughly two equal slices and calculates  the Tm for each slice considering corrections for monovalent ions, magnesium ions, and dNTPs.\n\nArguments\n\nprobe::String: The DNA probe sequence to check.\ntemperature_threshold::Integer: The minimum required melting temperature in degrees Celsius.\nmonovalent::Int64: Concentration of monovalent ions in mM.\nnn::nn_params: A structure containing the thermodynamic parameters for all possible nearest-neighbor pairs.\noligo_c::Float64: Oligo concentration in μM.\ndntps::Float64: Concentration of dNTPs in mM.\nmg::Float64: Concentration of magnesium ions in mM.\n\nReturns\n\nBoolean: true if all slices have a Tm above the temperature threshold, otherwise false.\n\nNotes\n\nThis function aims to ensure that all subsections of a DNA probe sequence have sufficient  stability (i.e., high melting temperature) to maintain a double-stranded configuration  under specific conditions. It's crucial when designing probes for applications where uniform hybridization across the probe is desired.\n\nExamples\n\nprobe = \"AATTATGACTGGGAAAGTAAACCGCCTCCACGTAAGCAAGGAAGGCATTCCAATTGTCGAACGGACTGAAGTTTCGGATA\"\nthreshold = 60\nmonovalent_concentration = 50\nnn_parameters = nn_params()\noligo_concentration = 2 * 1e-6\ndNTP_concentration = 0\nmg_concentration = 2\nresult = check_probe_tm(probe\n                        , threshold\n                        , monovalent_concentration\n                        , nn_parameters\n                        , oligo_concentration\n                        , dNTP_concentration\n                        , mg_concentration\n                        )\n\n\n\n\n\n","category":"function"},{"location":"#Phaj.slice_probe","page":"P.H.A.J.","title":"Phaj.slice_probe","text":"slice_probe(probe::String, slice_size::Int) -> Vector{String}\n\nGet substring slices from a probe of size slice_size.\n\nArguments\n\nprobe: A string containing the probe sequence to be split.\nslice_size: The size of the substring to created. Each probe is divided into chunks of this size (from left to right, and without overlap between chunks).\n\nReturns\n\nReturns the substrings of the input probe sequence.\n\nExample\n\nprobe = \"CGTGCGCCACTAGACTTGGCAAGGCGTGGAACCGATACCTGCTACCGTGTTAGCAACAAACAGCTATCAACACAGCCATG\"\nslice_size = 40\nprobe_slices = slice_probe(probe, slice_size)\n2-element Vector{String}:\n \"CGTGCGCCACTAGACTTGGCAAGGCGTGGAACCGATACCT\"\n \"GCTACCGTGTTAGCAACAAACAGCTATCAACACAGCCATG\"\n\n\n\n\n\n","category":"function"},{"location":"#Phaj.calculate_thermodynamic_parameters","page":"P.H.A.J.","title":"Phaj.calculate_thermodynamic_parameters","text":"calculate_thermodynamic_parameters(sequence::AbstractString, monovalent::Float64, nn::nn_params)\n\nCalculate the Gibbs free energy (ΔG), total enthalpy (ΔH), and total entropy (ΔS) of  a given DNA sequence. The computation is based on the nearest-neighbor (NN) model, taking  into account the sequence's content and a provided monovalent ion concentration.\n\nArguments\n\nsequence::AbstractString: A DNA sequence for which thermodynamic parameters will be calculated.\nmonovalent::Int64: The concentration of monovalent ions in mM.\nnn::nn_params: A structure containing the thermodynamic parameters for all possible nearest-neighbor pairs.\n\nReturns\n\naligned_delta_g: The Gibbs free energy (ΔG) of the sequence.\nsequence_dh_total: The total enthalpy (ΔH) of the sequence, considering both internal \n\nnearest-neighbor interactions and terminal base pair corrections.\n\nsequence_total_ds: The total entropy (ΔS) of the sequence based on its nearest-neighbor content.\n\nNotes\n\nThe function uses nearest-neighbor parameters and end compensation (terminal base pair  corrections) to compute the thermodynamics of the DNA sequence. The computed Gibbs free  energy is especially important for predicting the stability of DNA duplexes.\n\nExamples\n\nseq = \"AGTCGA\"\nmonovalent_concentration = 50\nnn_parameters = nn_params()\nΔG, ΔH, ΔS = calculate_thermodynamic_parameters(seq, monovalent_concentration, nn_parameters)\n\n\n\n\n\n","category":"function"},{"location":"#Phaj.longest_aligned_region!","page":"P.H.A.J.","title":"Phaj.longest_aligned_region!","text":"longest_aligned_region!(region::Region, alignment_anchors::Vector{AlignmentAnchor})\n\nModifies the region object in place to represent the longest aligned region in the given  alignment_anchors.\n\nArguments\n\nregion::Region: A Region object that will be modified in place. After the function call, \n\nregion.start and region.stop will be the start and end indices of the longest aligned  region in the alignment result.\n\nalignment_anchors::Vector{AlignmentAnchor}: The alignment anchors to analyze.\n\nExamples\n\nregion = Region(0, 0) \naln = alignment(alignment_result) \nalignment_anchors = alignment(alignment_result).a.aln.anchors\nlongest_aligned_region!(region, alignment_anchors)\nprintln(\"The longest aligned region is from index(region.start) to index(region.stop)\") \n\n\n\n\n\n","category":"function"},{"location":"#Phaj.probe_tm_salt_correction","page":"P.H.A.J.","title":"Phaj.probe_tm_salt_correction","text":"probe_tm_salt_correction(probe_melting_temperature, monovalent, magnesium, dNTPs, probe_gc, probe_length)\n\nAdjust the provided melting temperature for a DNA probe based on salt and magnesium concentrations in the buffer.\n\nUses equations from Owczarzy et al. (2008) to modify the melting temperature according to monovalent ion,  magnesium, and dNTP concentrations. \n\nReference: Owczarzy, R., et al. (2008). Biochemistry, https://doi.org/10.1021/bi702363u.\n\nArguments\n\nprobe_melting_temperature::Float64: Initial melting temperature (in Celsius) calculated at 1 M salt concentration.\nmonovalent::Float64: Concentration of monovalent ions (e.g., Na+ or K+).\nmagnesium::Float64: Concentration of magnesium ions.\ndNTPs::Float64: Concentration of dNTPs.\nprobe_gc::Float64: GC content of the probe as a fraction (0.0-1.0).\nprobe_length::Int: Length of the DNA probe.\n\nReturns\n\nFloat64: Adjusted melting temperature (in Celsius).\n\n\n\n\n\n","category":"function"},{"location":"#Phaj.parse_commandline","page":"P.H.A.J.","title":"Phaj.parse_commandline","text":"parse_commandline() -> Dict\n\nParse and collect command line arguments.\n\nDescription\n\nThis function fetches user-defined parameters for filtering potential DNA hybridization probes. The parameters include monovalent ion concentration, magnesium concentration, dNTP concentration,  probe oligo concentration, reaction temperature, homodimer sequence melting temperature,  delta G threshold, GC content bounds, maximum length of complementary base pairs, and  input/output filenames.\n\nReturns\n\nA dictionary containing user-defined parameters.\n\nCommand line arguments:\n\n--mono, -m: Monovalent ion concentration in reaction (default: 50.0 mM).\n--mg, -M: Magnesium concentration in reaction (default: 2.0 mM).\n--dntps, -d: dNTP concentration in reaction (default: 0.0 mM).\n--oligo, -c: Total probe oligo concentration in reaction (default: 0.25 μM).\n--temp, -t: Reaction temperature, serving as a melting temperature threshold for probes (default: 65°C).\n--heterodimer, -H: Maximum allowed homodimer sequence melting temperature (default: 25°C).\n--delta-g, -G: Delta G threshold, below which homodimer sequences are not allowed (default: -10.0).\n--upper, -u: Upper bound for percent GC (e.g., 0.7 for 70% GC; default: 0.6).\n--lower, -l: Lower bound for percent GC (e.g., 0.45 for 45% GC; default: 0.4).\n--max, -L: Maximum length of complementary base pairs a probe can have with other probes (default: 5).\n--out, -o: Output filename for a fasta containing promising probes (default: \"promising_probes.fa\").\nfasta: Input fasta file containing hybridization probes to be filtered (required).\n\nExample\n\n# Get arguements from the command-line\nparsed_args = parse_commandline()\nfor (arg,val) in parsed_args\n    println(\"  $arg  =>  $val\")\nend\n\n\n\n\n\n","category":"function"}]
}
